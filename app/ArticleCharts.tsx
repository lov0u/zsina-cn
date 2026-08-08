'use client';

import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const COLORS = ['#f59e0b', '#1f2937', '#ea580c', '#0891b2', '#16a34a', '#9333ea'];
function palette(i: number): string {
  return COLORS[i % COLORS.length];
}

/**
 * 把单元格文本解析成数字。
 * - 区间（"1.3-1.8" / "3000~12000" / "5 到 8"）取上限
 * - 普通数字（"1.0"、"50公斤起"）取第一个数字
 * - 纯文本（"大批量"）返回 null，该行会被跳过
 */
function parseCellNumber(text: string): number | null {
  if (!text) return null;
  const nums = text.match(/\d+(?:\.\d+)?/g);
  if (!nums || nums.length === 0) return null;

  // 区间：数字 + 分隔符 + 数字 → 取后者（上限）
  const range = text.match(/(\d+(?:\.\d+)?)\s*[-–—~至到]\s*(\d+(?:\.\d+)?)/);
  if (range) {
    const hi = parseFloat(range[2]);
    return isNaN(hi) ? null : hi;
  }

  const n = parseFloat(nums[0]);
  return isNaN(n) ? null : n;
}

/**
 * 扫描正文中的 table[data-chart]，用 Chart.js 在其前方渲染可视化图表。
 * 原始 <table> 始终保留在 DOM 中（语义化、可被搜索引擎抓取），图表只是增强展示。
 * 支持 data-chart="bar"（跨项对比）与 data-chart="pie"（占比构成）。
 */
export default function ArticleCharts() {
  useEffect(() => {
    const tables = Array.from(
      document.querySelectorAll<HTMLTableElement>('table[data-chart]')
    );
    if (!tables.length) return;

    const charts: Chart[] = [];

    tables.forEach((table) => {
      if (table.dataset.chartRendered === '1') return;
      table.dataset.chartRendered = '1';

      const chartType = table.getAttribute('data-chart') === 'pie' ? 'pie' : 'bar';
      const title = table.getAttribute('data-chart-title') || '';

      const headerCells = Array.from(table.querySelectorAll('thead th')).map(
        (th) => th.textContent?.trim() || ''
      );
      const bodyRows = Array.from(table.querySelectorAll('tbody tr'));
      const seriesNames = headerCells.slice(1);
      if (seriesNames.length === 0 || bodyRows.length === 0) return;

      // 只保留「至少有一个数值列可解析」的行，避免纯文本行在图上画成 0
      const usableRows: { label: string; values: (number | null)[] }[] = [];
      bodyRows.forEach((row) => {
        const label = row.children[0]?.textContent?.trim() || '';
        const values = seriesNames.map((_, ci) =>
          parseCellNumber(row.children[ci + 1]?.textContent?.trim() || '')
        );
        if (values.some((v) => v !== null)) {
          usableRows.push({ label, values });
        }
      });

      // 数据点太少，画图没意义，保留表格即可
      if (usableRows.length < 2) return;

      // 丢掉整列都无数值的系列（例如"适合货量：大批量/小批量"这种文字列）
      const keptSeries: number[] = [];
      seriesNames.forEach((_, ci) => {
        if (usableRows.some((r) => r.values[ci] !== null)) keptSeries.push(ci);
      });
      if (keptSeries.length === 0) return;

      const labels = usableRows.map((r) => r.label);

      let datasets;
      if (chartType === 'pie') {
        // 饼图只用第一个有效数值列
        const ci = keptSeries[0];
        datasets = [
          {
            label: seriesNames[ci],
            data: usableRows.map((r) => r.values[ci] ?? 0),
            backgroundColor: usableRows.map((_, i) => palette(i)),
            borderWidth: 1,
          },
        ];
      } else {
        datasets = keptSeries.map((ci, idx) => ({
          label: seriesNames[ci],
          data: usableRows.map((r) => r.values[ci] ?? 0),
          backgroundColor: palette(idx),
          borderColor: palette(idx),
          borderWidth: 1,
        }));
      }

      const wrap = document.createElement('div');
      wrap.className = 'article-chart-wrap';

      if (title) {
        const titleEl = document.createElement('div');
        titleEl.className = 'article-chart-title';
        titleEl.textContent = title;
        wrap.appendChild(titleEl);
      }

      // canvas 需要一个高度确定的直接父容器，Chart.js 才能正确 resize
      const canvasBox = document.createElement('div');
      canvasBox.className = 'article-chart-canvas';
      const canvas = document.createElement('canvas');
      canvasBox.appendChild(canvas);
      wrap.appendChild(canvasBox);
      table.parentNode?.insertBefore(wrap, table);

      charts.push(
        new Chart(canvas, {
          type: chartType,
          data: { labels, datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: chartType === 'pie' || keptSeries.length > 1,
                position: chartType === 'pie' ? 'right' : 'top',
              },
            },
            scales:
              chartType === 'pie'
                ? undefined
                : { y: { beginAtZero: true } },
          },
        })
      );
    });

    return () => {
      charts.forEach((c) => c.destroy());
    };
  }, []);

  return null;
}
