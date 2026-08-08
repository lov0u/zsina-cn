'use client';

import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const COLORS = ['#f59e0b', '#1f2937', '#ea580c', '#0891b2', '#16a34a', '#9333ea'];
function palette(i: number): string {
  return COLORS[i % COLORS.length];
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

    tables.forEach((table) => {
      if (table.dataset.chartRendered === '1') return;
      table.dataset.chartRendered = '1';

      const chartType = table.getAttribute('data-chart') === 'pie' ? 'pie' : 'bar';
      const title = table.getAttribute('data-chart-title') || '';

      const headerCells = Array.from(table.querySelectorAll('thead th')).map(
        (th) => th.textContent?.trim() || ''
      );
      const bodyRows = Array.from(table.querySelectorAll('tbody tr'));

      const labels = bodyRows.map((row) => row.children[0]?.textContent?.trim() || '');
      const seriesNames = headerCells.slice(1);

      const datasets = seriesNames.map((name, ci) => ({
        label: name,
        data: bodyRows.map((row) => {
          const cell = row.children[ci + 1];
          const raw = cell?.textContent?.replace(/[^\d.]/g, '') || '0';
          const num = parseFloat(raw);
          return isNaN(num) ? 0 : num;
        }),
        backgroundColor: palette(ci),
        borderColor: palette(ci),
        borderWidth: 1,
      }));

      const wrap = document.createElement('div');
      wrap.className = 'article-chart-wrap';

      if (title) {
        const titleEl = document.createElement('div');
        titleEl.className = 'article-chart-title';
        titleEl.textContent = title;
        wrap.appendChild(titleEl);
      }

      const canvas = document.createElement('canvas');
      wrap.appendChild(canvas);
      table.parentNode?.insertBefore(wrap, table);

      new Chart(canvas, {
        type: chartType,
        data: { labels, datasets },
        options: {
          responsive: true,
          plugins: {
            legend: { display: chartType === 'pie' || seriesNames.length > 1 },
          },
        },
      });
    });
  }, []);

  return null;
}
