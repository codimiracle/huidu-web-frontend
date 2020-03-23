export const BASE_URL = '/backend';

interface Group {
  icon: string,
  title: string,
  key: string,
  menus?: Array<EntryInfo>
}

interface GroupMap {
  [x: string]: Group
}

interface EntryInfo {
  group?: string,
  icon: string,
  key: string,
  title: string,
  link?: string,
  absoluteLink?: string
}
interface EntryInfoMap {
  [x: string]: EntryInfo
}

const Groups: GroupMap = {
  creator: {
    icon: 'edit',
    key: 'creator',
    title: '创作中心'
  },
  contributor: {
    icon: 'number',
    key: 'contributor',
    title: '投稿中心',
  },
  recommendation: {
    icon: 'robot',
    key: 'recommendation',
    title: '搜索推荐'
  },
  shopping: {
    icon: 'shopping',
    key: 'shopping',
    title: '书城管理',
  },
  classification: {
    icon: 'appstore',
    key: 'classification',
    title: '分类管理',
  },
  content: {
    icon: 'bulb',
    key: 'content',
    title: '内容管理'
  },
  system: {
    icon: 'control',
    key: 'system',
    title: '系统管理'
  }
}

const Entries: EntryInfoMap = {
  'frontend-services': {
    icon: 'crown',
    title: '前台服务',
    key: 'frontend-services',
    absoluteLink: '/'
  },
  'author-electronic-books-service': {
    icon: 'read',
    title: '电子书创作',
    group: 'creator',
    key: 'author-electronic-books-service',
    link: '/creator/electronic-books',
  },
  'author-audio-books-service': {
    icon: 'sound',
    title: '有声书创作',
    group: 'creator',
    key: 'author-audio-books-service',
    link: '/creator/audio-books'
  },
  'dashboard': {
    icon: 'dashboard',
    title: '后台面板',
    key: 'dashboard',
    link: '/'
  },
  'author-dashboard': {
    icon: 'dashboard',
    title: '作者面板',
    key: 'author-dashboard',
    link: '/creator/dashboard'
  },
  'comprehensive-page': {
    icon: 'home',
    title: '首页设计',
    key: 'comprehensive-page',
    link: '/comprehensive-page',
  },
  'user-recommendation': {
    group: 'recommendation',
    key: 'user-recommendation',
    icon: 'heart',
    title: '用户推荐',
    link: '/recommendation/user-recommendation'
  },
  'content-topics': {
    group: 'content',
    icon: 'meh',
    title: '话题管理',
    key: 'content-topics',
    link: '/contents/topics'
  },
  'content-comments': {
    group: 'content',
    icon: 'message',
    title: '评论管理',
    key: 'content-comments',
    link: '/contents/comments'
  },
  'content-reviews': {
    group: 'content',
    icon: 'star',
    title: '点评管理',
    key: 'content-reviews',
    link: '/contents/reviews'
  },
  'content-electronic-books': {
    group: 'content',
    icon: 'read',
    title: '电子书管理',
    key: 'content-electronic-books',
    link: '/contents/electronic-books'
  },
  'content-audio-books': {
    group: 'content',
    icon: 'sound',
    title: '有声书管理',
    key: 'content-audio-books',
    link: '/contents/audio-books'
  },
  'classification-categories': {
    group: 'classification',
    icon: 'appstore',
    title: '类别管理',
    key: 'classification-categories',
    link: '/classification/categories'
  },
  'classification-tags': {
    group: 'classification',
    icon: 'tags',
    title: '标签管理',
    key: 'classification-tags',
    link: '/classification/tags'
  },
  'classification-collection': {
    group: 'classification',
    icon: 'inbox',
    title: '榜单管理',
    key: 'classification-collection',
    link: '/classification/collections'
  },
  'shopping-commodities': {
    group: 'shopping',
    icon: 'shopping',
    title: '购买项管理',
    key: 'shopping-commodities',
    link: '/shopping/commodities'
  },
  'shopping-orders': {
    group: 'shopping',
    icon: 'profile',
    title: '订单管理',
    key: 'shopping-orders',
    link: '/shopping/orders'
  },
  'shopping-paper-books': {
    group: 'shopping',
    icon: 'read',
    title: '纸质书管理',
    key: 'shopping-paper-books',
    link: '/shopping/paper-books'
  },
  'user-users': {
    group: 'system',
    icon: 'user',
    title: '用户管理',
    key: 'user-users',
    link: '/system/users'
  },
  'user-roles': {
    group: 'system',
    icon: 'key',
    title: '角色管理',
    key: 'user-roles',
    link: '/system/roles'
  }
}

export enum Authority {
  FrontendServices = "frontend-services",
  AuthorDashboard = 'author-dashboard',
  AuthorDataServices = "author-data-services",
  AuthorElectronicsBooksService = "author-electronic-books-service",
  AuthorAudioBooksService = "author-audio-books-service",
  Dashboard = "dashboard",
  ComprehensivePage = "comprehensive-page",
  Recommendation = "recommendation",
  ContentTopics = "content-topics",
  ContentComments = "content-comments",
  ContentReviews = "content-reviews",
  ContentElectronicBooks = "content-electronic-books",
  ContentAudioBooks = "content-audio-books",
  ClassificationCategories = "classification-categories",
  ClassificationTags = "classification-tags",
  ClassificationCollection = "classification-collection",
  UserRecommendation = "user-recommendation",
  UserSearch = "user-search",
  ShoppingCommodities = "shopping-commodities",
  ShoppingOrders = "shopping-orders",
  ShoppingPaperBooks = "shopping-paper-books",
  UserUsers = "user-users",
  UserRoles = "user-roles"
}
export const ALL_PERMISSIONS = Object.values(Entries);
export const ALL_AUTHORITIES = Object.keys(Entries);
export const AUTHORITIES_MAP = Entries;

export const getNavigationMenus = (authorities: Array<string>) => {
  let roots: Array<EntryInfo> = [];
  let groupMap = {}
  authorities.map((authority) => Entries[authority]).forEach((entry: EntryInfo) => {
    if (entry) {
      if (entry.group) {
        groupMap[entry.group] = groupMap[entry.group] || { ...Groups[entry.group], menus: [] };
        groupMap[entry.group].menus.push(entry);
      } else {
        roots.push(entry);
      }
    }
  })

  //保证有一定的顺序
  let keys = Object.keys(Groups);
  let groups = keys.map((k) => groupMap[k]).filter((g) => g);
  let menus = roots.concat(groups);
  return menus;
}
