/**
 * 沂水景盛货运 - 服务数据与公司信息
 */

export interface Service {
  slug: string;
  name: string;
  icon: string;
  image: string;
  shortDesc: string;
  description: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  advantages: string[];
  scenes: string[];
}

export const services: Service[] = [
  {
    slug: "long-distance",
    name: "长途运输",
    icon: "truck",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "覆盖全国各地的长途货运服务，安全准时送达",
    description:
      "沂水景盛货运提供覆盖全国各地的长途货运服务，拥有丰富的长途运输经验和专业的司机团队。我们以安全、高效、守时为服务宗旨，为各类企业提供可靠的跨省长途运输解决方案。无论是整车还是零担，我们都能为您提供最优质的运输服务。",
    features: [
      "全国各省市区无盲区覆盖",
      "GPS实时定位全程跟踪",
      "专业司机团队经验丰富",
      "整车零担灵活承接",
      "货物保险全程保障",
    ],
    process: [
      {
        step: 1,
        title: "需求沟通",
        description: "了解货物类型、体量、起止地点及时效要求",
      },
      {
        step: 2,
        title: "方案制定",
        description: "根据需求制定最优运输路线和车辆配置方案",
      },
      {
        step: 3,
        title: "装车发运",
        description: "专业人员现场装车固定，发车并启动GPS跟踪",
      },
      {
        step: 4,
        title: "在途监控",
        description: "全程实时监控车辆位置和货物状态，及时反馈",
      },
      {
        step: 5,
        title: "到达签收",
        description: "货物安全送达目的地，收货方签收确认完成",
      },
    ],
    advantages: [
      "全国无盲区配送网络，偏远地区同样可达",
      "全天候调度系统，确保运输时效",
      "完善的货物保险体系，损失全额赔付",
      "专业客服团队，运输进度实时可查",
    ],
    scenes: [
      "工厂原材料及成品跨省调拨",
      "建材、钢材等大宗物资长途运输",
      "农产品及食品跨区域配送",
      "电商仓调及区域分拨",
    ],
  },
  {
    slug: "city-distribution",
    name: "城市配送",
    icon: "van",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "同城及城际快速配送，高效便捷最后一公里",
    description:
      "沂水景盛货运城市配送服务覆盖烟台及周边城市，提供同城配送、城际快运等多元化配送方案。我们拥有各类轻型、中型配送车辆，可满足不同规格货物的城市配送需求，为电商、商超、制造业等客户提供高效的最后一公里配送服务。",
    features: [
      "同城当日达，城际次日达",
      "多车型灵活匹配配送需求",
      "智能调度系统优化路线",
      "末端配送签收信息化管理",
      "定时配送与预约配送",
    ],
    process: [
      {
        step: 1,
        title: "订单接收",
        description: "接收客户配送订单，确认货物信息和配送地址",
      },
      {
        step: 2,
        title: "智能调度",
        description: "系统自动匹配最优车辆和配送路线",
      },
      {
        step: 3,
        title: "取货装车",
        description: "司机按时取货，核对货物并安全装车",
      },
      {
        step: 4,
        title: "配送签收",
        description: "按时送达指定地点，收货人签收确认",
      },
    ],
    advantages: [
      "响应迅速，下单后2小时内取货",
      "智能路线规划，配送效率提升30%",
      "电子签收系统，配送全程可追溯",
      "支持定时配送、夜间配送等多种模式",
    ],
    scenes: [
      "电商平台同城配送",
      "连锁商超门店补货",
      "餐饮企业食材配送",
      "办公用品及快递转运",
    ],
  },
  {
    slug: "cold-chain",
    name: "冷链物流",
    icon: "snowflake",
    image:
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "冷藏冷冻货物运输，全程温控品质保障",
    description:
      "沂水景盛货运冷链物流服务专注于冷藏、冷冻货物的全程温控运输。我们配备专业冷藏车队，车辆搭载温度监控系统，可实现运输全程温度实时记录和追溯，为食品、医药等对温度敏感的行业提供安全可靠的冷链运输解决方案。",
    features: [
      "专业冷藏车及冷冻车队",
      "全程温度实时监控记录",
      "温控数据可追溯查询",
      "食品级卫生标准车厢",
      "冷链专线定时发车",
    ],
    process: [
      {
        step: 1,
        title: "温区确认",
        description: "根据货物属性确认冷藏或冷冻温区要求",
      },
      {
        step: 2,
        title: "车辆预冷",
        description: "装车前对冷藏车厢进行预冷至指定温度",
      },
      {
        step: 3,
        title: "温控运输",
        description: "全程温控系统监控，确保温度恒定不断链",
      },
      {
        step: 4,
        title: "到货验收",
        description: "送达后提供温度记录报告，收货方验收确认",
      },
    ],
    advantages: [
      "全程温度可视化监控，断链自动报警",
      "符合食品卫生标准，车厢定期消毒",
      "专业冷链操作团队，熟悉温控规范",
      "温度数据报告随车提供，方便追溯",
    ],
    scenes: [
      "生鲜食品冷藏冷冻运输",
      "乳制品及冷饮配送",
      "医药及疫苗冷链运输",
      "农产品产地直发冷链",
    ],
  },
  {
    slug: "heavy-cargo",
    name: "大件运输",
    icon: "cargo",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "超大超重货物专业运输，特种方案安全可靠",
    description:
      "沂水景盛货运大件运输服务专注于超大、超宽、超重货物的专业运输。我们拥有各类特种运输车辆，包括低平板车、凹板车、伸缩板车等，可承接大型机械设备、工程构件、风电设备等大件货物的运输任务。专业团队提供路勘、护送、装卸一站式服务。",
    features: [
      "低平板、凹板、伸缩板等多车型",
      "大件运输许可证代办",
      "专业路勘及运输方案设计",
      "全程护送及交通协调",
      "大型吊装装卸服务",
    ],
    process: [
      {
        step: 1,
        title: "现场勘测",
        description: "专业人员勘测货物尺寸重量及起运、到达路况",
      },
      {
        step: 2,
        title: "方案设计",
        description: "制定运输方案，选择车型，办理超限运输许可证",
      },
      {
        step: 3,
        title: "装车固定",
        description: "专业吊装装车，多重固定确保运输安全",
      },
      {
        step: 4,
        title: "护送运输",
        description: "全程护送车辆跟随，协调沿途交通",
      },
      {
        step: 5,
        title: "卸货就位",
        description: "到达后专业卸货，按要求就位安装",
      },
    ],
    advantages: [
      "丰富的超限运输经验，安全零事故",
      "自有特种车辆，调度灵活响应快",
      "一站式服务，含许可代办和护送",
      "专业装卸团队，大型吊装设备齐全",
    ],
    scenes: [
      "大型机械设备工厂搬迁",
      "风电叶片及塔筒运输",
      "桥梁构件及钢结构运输",
      "变压器及电力设备运输",
    ],
  },
  {
    slug: "warehousing",
    name: "仓储服务",
    icon: "warehouse",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "仓储分拣配送一体化，智能管理高效周转",
    description:
      "沂水景盛货运仓储服务为客户提供仓储、分拣、配送一体化解决方案。我们拥有标准化仓库，配备WMS仓储管理系统，可实现货物入库、存储、分拣、出库的全流程信息化管理。结合自有运输车队，为客户提供仓配一体的高效供应链服务。",
    features: [
      "标准化仓库安全存储",
      "WMS智能仓储管理系统",
      "分拣打包贴标服务",
      "库存实时查询盘点",
      "仓配一体化服务",
    ],
    process: [
      {
        step: 1,
        title: "入库验收",
        description: "货物到仓后逐件验收，录入系统上架存储",
      },
      {
        step: 2,
        title: "仓储管理",
        description: "WMS系统管理库存，定期盘点确保账实相符",
      },
      {
        step: 3,
        title: "分拣打包",
        description: "按订单需求分拣货物，打包贴标",
      },
      {
        step: 4,
        title: "出库配送",
        description: "安排车辆装车配送，出库信息实时同步",
      },
    ],
    advantages: [
      "标准化仓库，消防安防设施齐全",
      "WMS系统管理，库存实时可视",
      "仓配一体，减少中间环节降本增效",
      "专业仓管团队，操作规范高效",
    ],
    scenes: [
      "电商企业仓储代运营",
      "制造业原材料及成品仓储",
      "季节性商品周转仓储",
      "区域配送中心分拨",
    ],
  },
];

export const companyInfo = {
  name: "沂水景盛货运",
  domain: "zsina.cn",
  email: "lov0u@foxmail.com",
  address: "烟台",
  description:
    "沂水景盛货运是一家专业货运物流企业，提供长途运输、城市配送、冷链物流、大件运输、仓储服务等综合物流解决方案。安全、高效、守时，全国直达，值得信赖。",
  keywords:
    "沂水景盛货运,货运物流,长途运输,城市配送,冷链物流,大件运输,仓储服务,烟台物流,全国货运",
  icp: "鲁ICP备2023024054号",
};

export const stats = [
  { value: "15", unit: "年", label: "服务年限" },
  { value: "200", unit: "+", label: "运输线路" },
  { value: "500", unit: "+", label: "合作客户" },
  { value: "50", unit: "万吨", label: "年运量" },
];

export const milestones = [
  {
    year: "2010",
    title: "公司成立",
    description: "沂水景盛货运正式成立，初期以烟台周边短途运输为主营业务",
  },
  {
    year: "2014",
    title: "拓展长途运输",
    description: "购置首批重型货车，开通全国长途运输线路，业务覆盖华北华东",
  },
  {
    year: "2018",
    title: "冷链业务上线",
    description: "投资建设冷藏车队，进入冷链物流领域，服务食品及医药行业",
  },
  {
    year: "2021",
    title: "仓储中心落成",
    description: "建成标准化仓储中心，引入WMS系统，实现仓配一体化运营",
  },
  {
    year: "2024",
    title: "数字化升级",
    description: "全面升级GPS调度系统和智能仓储管理，年运量突破50万吨",
  },
];

export const fleet = [
  {
    name: "重型牵引车",
    spec: "13-17米半挂列车",
    desc: "适用于长途大宗货物运输，载重大、效率高",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "冷藏运输车",
    spec: "6-9.6米冷藏厢车",
    desc: "全程温控，适用于生鲜食品及医药冷链运输",
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "城市配送车",
    spec: "4.2-7.6米厢式货车",
    desc: "灵活便捷，适用于同城及城际快速配送",
    image:
      "https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "特种大件车",
    spec: "低平板/伸缩板挂车",
    desc: "专业承运超大超重货物及大型机械设备",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80",
  },
];

export const qualifications = [
  {
    title: "道路运输经营许可证",
    desc: "持有合法有效的道路货物运输经营许可证",
  },
  {
    title: "大件运输资质",
    desc: "取得大型物件运输资质，可承接各类大件运输",
  },
  {
    title: "冷链运输认证",
    desc: "通过冷链物流服务认证，符合食品级运输标准",
  },
  {
    title: "ISO9001质量管理体系",
    desc: "通过ISO9001质量管理体系认证，管理规范",
  },
  {
    title: "安全生产标准化",
    desc: "通过道路运输企业安全生产标准化达标考核",
  },
];
