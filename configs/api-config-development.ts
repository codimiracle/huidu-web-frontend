// For IE
// if (!window.location.origin) {
//     window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
// }

export interface APIDefinitionSet {
  [x: string]: any;
}

/**
 * for using API in netwok-util
 */
/**
 * for using API in netwok-util
 */
export enum API {
  UserCollection = "user.collection",
  LoggedUserData = "user.logged",
  BookJoinCart = "cart.join",
  BookJoinShelf = "shelf.join",
  CategoryCollection = 'category.collection',
  // category
  CategoryEntity = 'category.entity',
  CategoryItems = "category.items",
  DiscoverCollection = 'discover.collection',
  // book
  ElectronicBookCollection = "electronicBook.collection",
  ElectronicBookEntity = "electronicBook.entity",
  ElectronicBookLastUpdate = "electronicBook.lastUpdate",
  ElectronicBookPublishYears = "electronicBook.publishYears",
  ElectronicBookEpisodeEntity = "electronicBook.episode.entity",
  ElectronicBookFirstEpisode = "electronicBook.episode.first",
  ElectronicBookCatalogs = "electronicBook.catalogs",
  ElectronicBookCreate = "ElectronicBookCreate",
  ElectronicBookEpisodeCreate = "ElectronicBookEpisodeCreate",
  ElectronicBookLastEditedEpisode = "electronicBook.lastUpdate",
  AudioBookFirstEpisode = "audioBook.episode.first",
  AudioBookEpisodeEntity = "audioBook.episode.entity",
  AudioBookEntity = "audioBook.entity",
  AudioBookCollection = "audioBook.collection",
  AudioBookComments = "audioBook.comments",
  AudioBookPublishYears = "audioBook.publishYears",
  AudioBookCatalogs = "audioBook.catalogs",
  PaperBookCollection = "paperBook.collection",
  PaperBookEntity = "paperBook.entity",
  PaperBookLastUpdate = "paperBook.lastUpdate",
  PaperBookComments = "paperBook.comments",
  PaperBookPublishYears = "paperBook.publishYears",
  // content
  SystemRealtime = "system.realtime",
  UserOrderEntity = "user.order.entity",
  UserOrderCollection = "user.order.collection",
  UserOrderring = "user.order.orderring",
  UserCartJoin = "user.cart.join",
  UserAddressDefault = "user.address.default",
  UserOrderPay = "user.order.pay",
  AudioBookLastUpdate = "audioBook.lastUpdate",
  UserShelfJoin = "user.shelf.join",
  UserProfile = "user.profile",
  UserAddressCollection = "user.address.collection",
  UserAddressEntity = "user.address.entity",
  UserAddressCreate = "user.address.create",
  UserAddressUpdate = "user.address.update",
  UserAddressDelete = "user.address.delete",
  UserSubscribeCollection = "user.subscribe.collection",
  UserSubscribeUnsubscribe = "user.subscribe.unsubscribe",
  UserShelfCells = "user.shelf.cells",
  UserBookNotesCollection = "user.bookNotes.collection",
  UserBookNotesCreate = "user.bookNotes.create",
  UserBookNotesEntity = "user.bookNotes.entity",
  UserArrived = "user.arrive.signin",
  UserArriveToday = "user.arrive.today",
  // content
  CreateComment = "comment.create",
  ContentCommentCollection = "content.comment.collection",
  ContentCommentLike = "content.comment.like",
  ContentCommentUnlike = "content.comment.unlike",
  ContentCommentCreate = "content.comment.create",
  TopicEntity = "topic.entity",
  TopicCollection = 'topic.collection',
  ReviewCollection = 'review.collection',
  ReviewEntity = 'review.entity',
  DynamicCollection = 'dynamic.collection',
  ElectronicBookSearch = "electronicBook.search",
  AudioBookSearch = "audioBook.search",
  ReviewCreate = "ReviewCreate",
  TopicCreate = "topic.create",
  TopicUpdate = "topic.update",
  UserSpaceDynamicCollection = "user.space.dynamicCollection",
  UserSpaceTopicCollection = "user.space.topicCollection",
  UserSpaceRelativedContents = "user.space.relativedContents",
  UserSpaceReviewCollection = "user.space.reviewCollection",
  SystemUsernameExists = "system.usernameExists",
  SystemSignIn = "system.signIn",
  SystemSignUp = "system.signUp",
  Search = "search",
  AuthorStatistics = "author.statistics",
  AuthorElectronicBookCollection = "author.electronicBook.collection",
  AuthorElectronicBookSearch = "author.electronicBook.search",
  Upload = "http://192.168.43.178:4000/api/reference-data/upload",
  UploadSource = "http://192.168.43.178:4000/api/reference-data/sources",
  CategorySuggetion = "CategorySuggetion",
  TagSuggetion = "TagSuggetion",
  ElectronicBookEpisodeUpdate = "ElectronicBookEpisodeUpdate",
  AuthorAudioBookCollection = "audioBook.collection",
  AuthorAudioBookSearch = "audioBook.search",
  AudioBookCreate = "audioBook.entity",
  BookMetadataSearch = "BookMetadataSearch",
  // backend
  BackendOrderCollection = "backend.order.collection",
  BackendTopicCollection = "backend.topic.collection",
  BackendCategoryCollection = "backend.category.collection",
  BackendCommentCollection = "backend.comment.collection",
  BackendRoleCollection = "backend.role.collection",
  BackendRoleCreate = "backend.role.create",
  BackendRoleUpdate = "backend.role.update",
  BackendRoleDelete = "backend.role.delete",
  BackendUserCreate = "backend.user.create",
  BackendUserUpdate = "backend.User.update",
  BackendUserCollection = "backend.user.collection",
  BackendUserDelete = "backend.user.delete",
  BackendUserChangePassword = 'backend.user.changePassword',
  BackendCommodityCollection = "backend.commodity.collection",
  BackendCommodityCreate = "backend.commodity.create",
  BackendCommodityUpdate = "backend.commodity.update",
  BackendCommodityDelete = "backend.commodity.delete",
  BackendPaperBookCollection = "backend.paperBook.collection",
  BackendReviewCollection = "backend.review.collection",
  BackendElectronicBookCollection = "backend.electronicBook.collection",
  BackendElectronicBookCreate = "backend.ElectronicBookCreate",
  BackendElectronicBookUpdate = "backend.ElectronicBookUpdate",
  BackendElectronicBookDelete = "backend.ElectronicBookDelete",
  BackendElectronicBookEpisodeCollection = "backend.electronicBook.episode.collection",
  BackendElectronicBookEntity = "backend.electronicBook.entity",
  BackendElectronicBookEpisodeCreate = "backend.ElectronicBookEpisodeCreate",
  BackendElectronicBookEpisodeUpdate = "backend.ElectronicBookEpisodeUpdate",
  BackendElectronicBookEpisodeDelete = "backend.ElectronicBookEpisodeDelete",
  BackendElectronicBookEpisodeEntity = "backend.electronicBook.episode.entity",
  BackendAudioBookCollection = "backend.audioBook.collection",
  BackendAudioBookCreate = "backend.audioBook.create",
  BackendAudioBookDelete = "backend.audioBook.delete",
  BackendAudioBookUpdate = "backend.audioBook.update",
  BackendAudioBookEntity = "backend.audioBook.entity",
  BackendAudioBookEpisodeCollection = "backend.audioBook.episode.collection",
  BackendAudioBookEpisodeDelete = "backend.audioBook.episode.delete",
  BackendActivityCollection = "backend.activity.collection",
  BackendActivityCreate = "backend.activity.create",
  BackendActivityDelete = "backend.activity.delete",
  BackendActivityUpdate = "backend.activity.update",
  BackendAudioBookEpisodeCreate = "BackendAudioBookEpisodeCreate",
  BackendAudioBookEpisodeUpdate = "BackendAudioBookEpisodeUpdate",
  BackendCommentDelete = "BackendCommentDelete",
  BackendTagCollection = "BackendTagCollection",
  BackendCollectionCollection = "BackendCollectionCollection",
  BackendPaperBookCreate = "BackendPaperBookCreate",
  BackendPaperBookUpdate = "BackendPaperBookUpdate",
  BackendPaperBookDelete = "BackendPaperBookDetete",
  CommoditySearch = "CommoditySearch",
  CategoryExhibitedCollection = "category.exhibited.collection",
  CategorySearch = "CategorySearch",
  RecommendationInteresting = "recommendation.interesting",
  RecommendationSameInteresting = "recommendation.sameInteresting"
}

// const address = '192.168.1.150';
const address = '192.168.43.195';

// var origin = window.location.origin;
var origin = `http://${address}:3000`;

interface APIDefinition {
  url: string,
  method: "get" | "post" | "put" | "delete",
  parameters: any
}

/**
 * API definitions, it is url plus placeholder really.
 * 
 * plachholder starts with '@{' and ends with '}'.
 */
export const APIDefinitionData: APIDefinitionSet = {
  backend: {
    activity: {
      collection: `${origin}/api/backend/activities?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    order: {
      collection: `${origin}/api/backend/shopping/orders?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    electronicBook: {
      collection: `${origin}/api/backend/contents/electronic-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      entity: `${origin}/api/backend/contents/electronic-books/@{book_id}`,
      episode: {
        entity: `${origin}/api/backend/contents/electronic-books/@{book_id}/episodes/@{episode_id}`,
        collection: `${origin}/api/backend/contents/electronic-books/@{book_id}/episodes?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      }
    },
    audioBook: {
      collection: `${origin}/api/backend/contents/audio-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      entity: `${origin}/api/backend/contents/audio-books/@{book_id}`,
      episode: {
        entity: `${origin}/api/backend/contents/audio-books/@{book_id}/episodes/@{episode_id}`,
        collection: `${origin}/api/backend/contents/audio-books/@{book_id}/episodes?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      }
    },
    paperBook: {
      collection: `${origin}/api/backend/shopping/paper-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    },
    topic: {
      collection: `${origin}/api/backend/contents/topics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    review: {
      collection: `${origin}/api/backend/contents/reviews?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    category: {
      collection: `${origin}/api/backend/classification/categories?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    comment: {
      collection: `${origin}/api/backend/contents/comments?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    role: {
      create: {
        url: `${origin}/api/backend/system/roles`,
        method: 'post',
        body: {
          name: null,
          authorities: null
        }
      },
      update: {
        url: `${origin}/api/backend/system/roles/@{role_id}`,
        method: 'put',
        query: {
          role_id: null
        },
        body: {
          name: null,
          authorities: []
        }
      },
      delete: {
        url: `${origin}/api/backend/system/roles/@{role_id}`,
        method: 'delete',
        query: {
          role_id: null
        }
      },
      collection: `${origin}/api/backend/system/roles?page=@{page}&limit=@{limit}`
    },
    user: {
      collection: `${origin}/api/backend/system/users?page=@{page}&limit=@{limit}`
    },
    commodity: {
      collection: `${origin}/api/backend/shopping/commodities?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    }
  },
  search: {
    url: `${origin}/api/search?kw=@{keyword}&type=@{type}`
  },
  electronicBook: {
    search: `${origin}/api/electronic-books/search?q=@{keyword}`,
    entity: `${origin}/api/electronic-books/@{book_id}`,
    lastUpdate: `${origin}/api/electronic-books/@{book_id}/last-update`,
    comments: `${origin}/api/electronic-books/@{book_id}/comments?page=@{page}&limit=@{limit}`,
    catalogs: `${origin}/api/electronic-books/@{book_id}/catalogs`,
    episode: {
      first: `${origin}/api/electronic-books/@{book_id}/episodes/first`,
      collection: `${origin}/api/electronic-books/@{book_id}/episodes?page=@{page}&limit=@{limit}`,
      entity: `${origin}/api/electronic-books/@{book_id}/episodes/@{episode_id}`,
    },
    collection: {
      url: `${origin}/api/electronic-books?filter=@{filter}&page=@{page}&limit=@{limit}`,
      query: {
        filter: null
      }
    },
    publishYears: `${origin}/api/electronic-books/publish-years`
  },
  audioBook: {
    search: `${origin}/api/audio-books/search?q=@{keyword}`,
    entity: `${origin}/api/audio-books/@{book_id}`,
    catalogs: `${origin}/api/audio-books/@{book_id}/catalogs`,
    lastUpdate: `${origin}/api/audio-books/@{book_id}/last-update`,
    comments: `${origin}/api/audio-books/@{book_id}/comments?page=@{page}&limit=@{limit}`,
    episode: {
      first: `${origin}/api/audio-books/@{book_id}/episodes/first`,
      collection: `${origin}/api/audio-books/@{book_id}/episodes?page=@{page}&limit=@{limit}`,
      entity: `${origin}/api/audio-books/@{book_id}/episodes/@{episode_id}`,
    },
    collection: {
      url: `${origin}/api/audio-books?filter=@{filter}&page=@{page}&limit=@{limit}`,
      query: {
        filter: null
      }
    },
    publishYears: `${origin}/api/audio-books/publish-years`
  },
  paperBook: {
    entity: `${origin}/api/paper-books/@{book_id}`,
    collection: {
      url: `${origin}/api/paper-books?filter=@{filter}&page=@{page}&limit=@{limit}`,
      query: {
        filter: null
      }
    },
    publishYears: `${origin}/api/paper-books/publish-years`
  },
  category: {
    collection: `${origin}/api/categories`,
    exhibited: {
      collection: `${origin}/api/categories/exhibited`
    },
    entity: `${origin}/api/categories/@{category_id}`,
    items: `${origin}/api/categories/@{category_id}/items?page=@{page}&limit=@{limit}&filter=@{filter}`,
    bookCollection: `${origin}/api/categories/@{category_id}/books?page=@{page}&limit=@{limit}&filter=@{filter}`,
    hotBookCollection: `${origin}/api/categories/@{category_id}/hot-books?page=@{page}&limit=@{limit}&filter=@{filter}`,
  },
  dynamic: {
    collection: `${origin}/api/dynamics?limit=@{limit}&page=@{page}`
  },
  review: {
    entity: `${origin}/api/reviews/@{review_id}`,
    collection: `${origin}/api/reviews?limit=@{limit}&page=@{page}`
  },
  topic: {
    create: {
      url: `${origin}/api/topics`,
      method: 'post',
      body: {
        title: null,
        type: '',
        content: '',
        references: []
      }
    },
    update: {
      url: `${origin}/api/topics/@{topic_id}`,
      method: 'put',
      body: {
        title: null,
        type: '',
        content: '',
        references: []
      }
    },
    entity: `${origin}/api/topics/@{topic_id}`,
    collection: `${origin}/api/topics?limit=@{limit}&page=@{page}`
  },
  content: {
    comment: {
      create: {
        url: `${origin}/api/contents/@{content_id}/comments`,
        method: 'post',
        body: {
          content_id: null,
          content: null,
          mention: null,
          rate: null,
        }
      },
      like: {
        url: `${origin}/api/contents/@{content_id}/like`,
        method: 'post',
        body: {
          content_id: null
        }
      },
      unlike: {
        url: `${origin}/api/contents/@{content_id}/unlike`,
        method: 'post',
        body: {
          content_id: null
        }
      },
      collection: `${origin}/api/contents/@{content_id}/comments?page=@{page}&limit=@{limit}`,
    }
  },
  author: {
    statistics: `${origin}/api/author/statistics`,
    electronicBook: {
      search: `${origin}/api/electronic-books/search?q=@{keyword}`,
      collection: {
        url: `${origin}/api/electronic-books?filter=null&page=@{page}&limit=@{limit}`,
        query: {
          filter: null
        }
      }
    },
  },
  user: {
    space: {
      dynamicCollection: `${origin}/api/users/@{user_id}/space/dynamics?page=@{page}&limit=@{limit}`,
      topicCollection: `${origin}/api/users/@{user_id}/space/topics?page=@{page}&limit=@{limit}`,
      reviewCollection: `${origin}/api/users/@{user_id}/space/reviews?page=@{page}&limit=@{limit}`,
      relativedContents: `${origin}/api/users/@{user_id}/space/relatived-contents?page=@{page}&limit=@{limit}`,
    },
    arrive: {
      signin: {
        url: `${origin}/api/user/arrive/signin`,
        method: 'post',
        body: {
          date: null
        }
      },
      today: {
        url: `${origin}/api/user/arrive/today`,
      }
    },
    logout: `${origin}/api/user/logout`,
    logged: `${origin}/api/user/logged`,
    profile: `${origin}/api/user/profile`,
    bookNotes: {
      entity: `${origin}/api/user/book-notes/@{book_id}`,
      collection: `${origin}/api/user/book-notes?page=@{page}&limit=@{limit}`,
      create: {
        url: `${origin}/api/user/book-notes/@{book_id}`,
        method: 'post',
        body: {
          book_id: null,
          episodeId: null,
          ref: '',
          content: null,
          domMark: null
        }
      }
    },
    address: {
      default: `${origin}/api/user/addresses/default`,
      entity: `${origin}/api/user/addresses/@{address_id}`,
      collection: `${origin}/api/user/addresses?page=@{page}&limit=@{limit}`,
      update: {
        url: `${origin}/api/user/addresses/@{address_id}`,
        method: 'post',
        body: {
          address: null,
          region: null,
          receiver: null,
          postcode: null
        }
      },
      create: {
        url: `${origin}/api/user/addresses`,
        method: 'post',
        body: {
          address: null,
          region: null,
          receiver: null,
          postcode: null
        }
      },
      delete: {
        url: `${origin}/api/user/addresses/@{address_id}`,
        method: 'delete'
      }
    },
    order: {
      collection: `${origin}/api/user/orders?filter=@{filter}&page=@{page}&limit=@{limit}`,
      entity: `${origin}/api/user/orders/@{order_number}`,
      pay: {
        url: `${origin}/api/user/orders/pay`,
        method: 'post',
        body: {
          order_number: null,
          password: null
        }
      },
      orderring: {
        url: `${origin}/api/user/orders/orderring`,
        body: {
          addressId: null,
          items: null
        }
      }
    },
    cart: {
      collection: `${origin}/api/user/cart?page=@{page}&limit=@{limit}`,
      join: {
        url: `${origin}/api/user/cart/join`,
        body: {
          book_id: null
        }
      }
    },
    shelf: {
      cells: {
        url: `${origin}/api/user/shelf/cells?page=@{page}&limit=@{limit}`,
      },
      join: {
        url: `${origin}/api/user/shelf/join`,
        body: {
          book_id: null
        }
      }
    },
    subscribe: {
      collection: `${origin}/api/user/subscribes?page=@{page}&limit=@{limit}`,
      unsubscribe: `${origin}/api/user/subscribes/@{subscribe_id}`,
      create: {
        url: `${origin}/api/user/subscribes`,
        method: 'post',
        body: {
          type: '',
          book_id: null,
        }
      },
      update: {

      }
    }
  },
  recommendation: {
    interesting: `${origin}/api/recommendation/by-interesting?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    sameInteresting: `${origin}/api/recommendation/by-same-interesting?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
  },
  discover: {
    collection: `${origin}/api/recommendation/discover`
  },
  system: {
    signIn: `${origin}/api/system/sign-in`,
    signUp: `${origin}/api/system/sign-up`,
    usernameExists: `${origin}/api/system/username-exists?username=@{username}`,
    realtime: `${origin}/api/system/realtime`
  }
}

export default {};