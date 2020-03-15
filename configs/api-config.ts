import { ElectronicBookStatus } from "../types/electronic-book";

let browserWindow = null;
if (typeof window == 'object') {
  browserWindow = window;
} else {
  browserWindow = {
    location: {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000'
    }
  }
}
// For IE
if (!browserWindow.location.origin) {
  browserWindow.location.origin = browserWindow.location.protocol + "://" + browserWindow.location.hostname + (browserWindow.location.port ? ':' + browserWindow.location.port : '');
}

export interface APIDefinition {
  url: string,
  method: "get" | "post" | "put" | "delete",
  query: any,
  body: any,
}

// const address = '192.168.1.150';
// const address = '192.168.43.195';

var origin: string = browserWindow.location.origin;
// var origin = `http://${address}:3000`;

var testOrigin = `http://192.168.43.178:4000`;

export interface APIDefinitionSet {
  [x: string]: any | APIDefinition | APIDefinitionSet;
}

/**
 * for using API in netwok-util
 */
/**
 * for using API in netwok-util
 */
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
  CategoryBookTypeRelated = 'category.related',
  CategoryEntity = 'category.entity',
  CategoryItemsCollection = "category.items.collection",
  CategoryItemsMostRead = "category.items.mostread",
  CategoryItemsRecommends = "category.items.recommends",
  DiscoverCollection = 'discover.collection',
  // book
  BackendBookSuggestion = "backend.book.suggestion",
  ElectronicBookCollection = "electronicBook.collection",
  ElectronicBookEntity = "electronicBook.entity",
  ElectronicBookLastUpdate = "electronicBook.lastUpdate",
  ElectronicBookPublishYears = "electronicBook.publishYears",
  ElectronicBookEpisodeEntity = "electronicBook.episode.entity",
  ElectronicBookLastReadEpisode = "electronicBook.episode.lastRead",
  ElectronicBookCatalogs = "electronicBook.catalogs",
  ElectronicBookEpisodeCreate = "ElectronicBookEpisodeCreate",
  ElectronicBookLastEditedEpisode = "electronicBook.lastUpdate",
  AudioBookLastReadEpisode = "audioBook.episode.lastRead",
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
  // frontend
  SystemRealtime = "system.realtime",
  CommonMostRead = "common.mostRead",
  CommonRecommends = "common.recommends",
  UserOrderEntity = "user.order.entity",
  UserOrderCollection = "user.order.collection",
  UserOrderring = "user.order.orderring",
  UserCartJoin = "user.cart.join",
  UserAddressDefault = "user.address.default",
  UserAddressMakeDefault = "user.address.makeDefault",
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
  SystemNicknameExists = "system.nicknameExists",
  SystemSignIn = "system.signIn",
  SystemSignUp = "system.signUp",
  Search = "search",
  AuthorStatistics = "creator.statistics",
  Upload = `http://192.168.43.178:4000/api/reference-data/upload`,
  UploadSource = `http://192.168.43.178:4000/api/reference-data/source`,
  AvatarSource = `http://192.168.43.178:4000/api/user/avatar`,
  CoverSource = `http://192.168.43.178:4000/api/books/cover`,
  CategorySuggetion = "category.suggestion",
  TagSuggetion = "tag.suggestion",
  ElectronicBookEpisodeUpdate = "ElectronicBookEpisodeUpdate",
  AudioBookCreate = "audioBook.entity",
  BookMetadataSuggestion = "bookMetadata.suggestion",
  // creator
  CreatorElectronicBookCollection = "creator.electronicBook.collection",
  CreatorElectronicBookSearch = "creator.electronicBook.search",
  CreatorElectronicBookCreate = "creator.electronicBook.create",
  CreatorElectronicBookUpdate = "creator.electronicBook.update",
  CreatorElectronicBookDelete = "creator.electronicBook.delete",
  CreatorElectronicBookEntity = "creator.electronicBook.entity",
  CreatorElectronicBookCatalogs = "creator.electronicBook.catalogs",
  CreatorElectronicBookEpisodeCreate = "creator.electronicBook.episode.create",
  CreatorElectronicBookEpisodeUpdate = "creator.electronicBook.episode.update",
  CreatorElectronicBookEpisodeDelete = "creator.electronicBook.episode.delete",
  CreatorElectronicBookEpisodeEntity = "creator.electronicBook.episode.entity",
  CreatorElectronicBookEpisodeLastNumber = "creator.electronicBook.episode.lastEpisodeNumber",
  CreatorElectronicBookLastEditedEpisode = "creator.electronicBook.episode.lastUpdatedEpisode",
  CreatorAudioBookCreate = "creator.audioBook.create",
  CreatorAudioBookUpdate = "creator.audioBook.update",
  CreatorAudioBookDelete = "creator.audioBook.delete",
  CreatorAudioBookEntity = "creator.audioBook.entity",
  CreatorAudioBookSearch = "creator.audioBook.search",
  CreatorAudioBookCollection = "creator.audioBook.collection",
  CreatorAudioBookCatalogs = "creator.audioBook.catalogs",
  CreatorAudioBookEpisodeCreate = "creator.audioBook.episode.create",
  CreatorAudioBookEpisodeUpdate = "creator.audioBook.episode.update",
  CreatorAudioBookEpisodeDelete = "creator.audioBook.episode.delete",
  CreatorAudioBookEpisodeEntity = "creator.audioBook.episode.entity",
  CreatorAudioBookEpisodeLastNumber = "creator.audioBook.episode.lastEpisodeNumber",
  CreatorAudioBookLastEditedEpisode = "creator.audioBook.episode.lastUpdatedEpisode",
  // backend
  BackendOrderCollection = "backend.order.collection",
  BackendTopicCollection = "backend.topic.collection",
  BackendTopicAcceptExamination = "backend.topic.accept",
  BackendTopicRejectExamination = "backend.topic.reject",
  BackendTopicDelete = "backend.topic.delete",
  BackendCategoryCollection = "backend.category.collection",
  BackendCategoryCreate = "backend.category.create",
  BackendCategoryUpdate = "backend.category.update",
  BackendCategoryDelete = "backend.category.delete",
  BackendCommentCollection = "backend.comment.collection",
  BackendRoleCollection = "backend.role.collection",
  BackendRoleSuggestion = "backend.role.suggestion",
  BackendRoleCreate = "backend.role.create",
  BackendRoleUpdate = "backend.role.update",
  BackendRoleDelete = "backend.role.delete",
  BackendUserCreate = "backend.user.create",
  BackendUserUpdate = "backend.user.update",
  BackendUserCollection = "backend.user.collection",
  BackendUserDelete = "backend.user.delete",
  BackendUserChangePassword = 'backend.user.changePassword',
  BackendCommodityCollection = "backend.commodity.collection",
  BackendCommodityCreate = "backend.commodity.create",
  BackendCommodityUpdate = "backend.commodity.update",
  BackendCommodityDelete = "backend.commodity.delete",
  BackendPaperBookCreate = "backend.paperBook.create",
  BackendPaperBookUpdate = "backend.paperBook.update",
  BackendPaperBookDelete = "backend.paperBook.delete",
  BackendPaperBookCollection = "backend.paperBook.collection",
  BackendReviewCollection = "backend.review.collection",
  BackendElectronicBookCollection = "backend.electronicBook.collection",
  BackendElectronicBookCreate = "backend.electronicBook.create",
  BackendElectronicBookUpdate = "backend.electronicBook.update",
  BackendElectronicBookDelete = "backend.electronicBook.delete",
  BackendElectronicBookEpisodeCollection = "backend.electronicBook.episode.collection",
  BackendElectronicBookEntity = "backend.electronicBook.entity",
  BackendElectronicBookEpisodeCreate = "backend.electronicBook.episode.create",
  BackendElectronicBookEpisodeUpdate = "backend.electronicBook.episode.update",
  BackendElectronicBookEpisodeDelete = "backend.electronicBook.episode.delete",
  BackendElectronicBookEpisodeEntity = "backend.electronicBook.episode.entity",
  BackendElectronicBookEpisodeLastNumber = "backend.electronicBook.episode.lastEpisodeNumber",
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
  BackendAudioBookEpisodeCreate = "backend.audioBook.episode.create",
  BackendAudioBookEpisodeUpdate = "backend.audioBook.episode.update",
  BackendCommentDelete = "backend.comment.delete",
  BackendTagCollection = "backend.tag.collection",
  BackendTagCreate = "backend.tag.create",
  BackendTagUpdate = "backend.tag.update",
  BackendTagDelete = "backend.tag.delete",
  BackendCollectionSuggestion = "backend.collection.suggestion",
  BackendCollectionCollection = "backend.collection.collection",
  BackendCollectionCreate = "backend.collection.create",
  BackendCollectionUpdate = "backend.collection.update",
  BackendCollectionDelete = "backend.collection.delete",
  BackendComprehensivePage = "backend.comprehensivePage",
  ComprehensivePageCategories = "comprehensivePage.categories",
  ComprehensivePageCollections = "comprehensivePage.collections",
  CommoditySearch = "CommoditySearch",
  CategoryExhibitedCollection = "category.exhibited.collection",
  CategorySuggestion = "category.suggestion",
  RecommendationInteresting = "recommendation.interesting",
  RecommendationSameInteresting = "recommendation.sameInteresting",
  BackendUserResetPassword = "BackendUserResetPassword",
  BackendOrderLogisticsInformationUpdate = "backend.order.logisticsInformation.update",
  ElectronicBookEpisodeSuggestion = "electronicBook.episode.suggestion",
  ElectronicBookComments = "electronic.book.comments",
  UserNotificationCollection = "user.notification.collection",
  UserNotificationMarkAsRead = "user.notification.markAsRead",
  UserNotificationReadCollection = "user.notification.read.collection",
  UserNotificationUnreadCollection = "user.notification.unread.collection",
  CommunityDynamicCollection = "community.dynamic.collection",
  CommunityTopicCollection = "community.topic.collection",
  CommunityReviewCollection = "community.review.collection",
  UserDynamicCollection = "user.community.dynamic.collection",
  UserNotificationMarkAsReadBulk = "user.notification.markAllRead",
  UserAccountBalance = "user.account.balance",
  UserAccountRecharge = "user.account.recharge",
  UserAccountRechargePay = "user.account.rechargePay",
  SystemSignOut = "system.signOut",
  UserCartItems = "user.cart.items",
  UserCartItemsTotalCount = "user.cart.totalCount",
  UserCartItemDelete = "user.cart.item.delete",
  UserCartItemsByIds = "user.cart.itemsByIds",
  PaperBookCollectionByIds = "paperBook.collectionByIds"
}

/**
 * API definitions, it is url plus placeholder really.
 * 
 * plachholder starts with '@{' and ends with '}'.
 * body used as request body
 */
export const APIDefinitionData: APIDefinitionSet = {
  backend: {
    comprehensivePage: {
      url: `${testOrigin}/api/backend/comprehensive-page`,
      method: 'post',
      body: {
        categoryIds: [],
        collectionIds: [],
      }
    },
    book: {
      suggestion: `${testOrigin}/api/books/suggestion?keyword=@{keyword}`
    },
    activity: {
      create: {
        url: `${testOrigin}/api/backend/activities`,
        method: 'post',
        body: {
          banner: null,
          bookId: null,
          status: null,
          url: null
        },
      },
      update: {
        url: `${testOrigin}/api/backend/activities/@{activity_id}`,
        method: 'put',
        body: {
          activity_id: null,
          banner: null,
          bookId: null,
          status: null,
          url: null
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/activities/@{activity_id}`
      },
      collection: `${testOrigin}/api/backend/activities?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    order: {
      collection: `${testOrigin}/api/backend/shopping/orders?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      logisticsInformation: {
        update: {
          url: `${testOrigin}/api/backend/shopping/orders/@{order_number}/logistics-information`,
          body: {
            expressNumber: null,
            expressCompany: null,
            passingPoints: []
          }
        }
      }
    },
    electronicBook: {
      create: {
        url: `${testOrigin}/api/backend/contents/electronic-books`,
        method: 'post',
        body: {
          metadataId: null,
          metadata: null,
          categoryId: null,
          category: null,
          publishYear: null,
          status: ElectronicBookStatus.Examining,
          tags: []
        }
      },
      update: {
        url: `${testOrigin}/api/backend/contents/electronic-books/@{electronic_book_id}`,
        method: 'put',
        query: {
          electronic_book_id: null,
        },
        body: {
          metadataId: null,
          metadata: null,
          categoryId: null,
          category: null,
          publishYear: null,
          status: ElectronicBookStatus.Examining,
          tags: []
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/contents/electronic-books/@{electronic_book_id}`,
        method: 'delete',
        query: {
          electronic_book_id: null,
        },
      },
      collection: `${testOrigin}/api/backend/contents/electronic-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}`,
      episode: {
        create: {
          url: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/episodes`,
          method: 'post',
          body: {
            title: null,
            content: null,
            words: null,
            status: null,
            episodeNumber: null,
          }
        },
        update: {
          url: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/episodes/@{episode_id}`,
          method: 'put',
          query: {
            episode_id: null,
          },
          body: {
            title: null,
            content: null,
            words: null,
            status: null,
            episodeNumber: null,
          }
        },
        catalogs: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/catalogs`,
        lastEpisodeNumber: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/episodes/last-episode-number`,
        entity: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/episodes/@{episode_id}`,
        collection: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/episodes?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      }
    },
    audioBook: {
      create: {
        url: `${testOrigin}/api/backend/contents/audio-books`,
        body: {
          title: null,
          description: null,
          teller: null,
          cover: null,
          categoryId: null,
          category: null,
          metadataId: null,
          publishYear: null,
          metadata: null,
          status: null,
          tags: []
        }
      },
      update: {
        url: `${testOrigin}/api/backend/contents/audio-books/@{audio_book_id}`,
        query: {
          audio_book_id: null
        },
        body: {
          title: null,
          description: null,
          teller: null,
          cover: null,
          categoryId: null,
          category: null,
          metadataId: null,
          status: null,
          publishYear: null,
          metadata: null,
          tags: []
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/contents/audio-books/@{audio_book_id}`,
        query: {
          audio_book_id: null
        }
      },
      collection: `${testOrigin}/api/backend/contents/audio-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/backend/contents/audio-books/@{book_id}`,
      episode: {
        create: {
          url: `${testOrigin}/api/backend/contents/audio-books/@{book_id}/episodes`,
          query: {
            book_id: null
          },
          body: {
            book_id: null,
            title: null,
            status: null,
            streamUrl: null,
            episodeId: null
          }
        },
        update: {
          url: `${testOrigin}/api/backend/contents/audio-books/@{book_id}/episodes/@{audio_episode_id}`,
          query: {
            book_id: null,
            audio_episode_id: null,
          },
          body: {
            title: null,
            status: null,
            streamUrl: null,
            episodeId: null
          }
        },
        delete: {
          url: `${testOrigin}/api/backend/contents/audio-books/@{book_id}/episodes/@{audio_episode_id}`,
          query: {
            book_id: null,
            audio_episode_id: null
          }
        },
        entity: `${testOrigin}/api/backend/contents/audio-books/@{book_id}/episodes/@{episode_id}`,
        collection: `${testOrigin}/api/backend/contents/audio-books/@{book_id}/episodes?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      }
    },
    paperBook: {
      create: {
        url: `${testOrigin}/api/backend/shopping/paper-books`,
        body: {
          metadataId: null,
          metadata: null,
          commodityId: null,
          commodity: null,
          categoryId: null,
          category: null,
          tags: [],
          publishYear: null,
        }
      },
      update: {
        url: `${testOrigin}/api/backend/shopping/paper-books/@{paper_book_id}`,
        query: {
          paper_book_id: null,
        },
        body: {
          metadataId: null,
          metadata: null,
          commodityId: null,
          commodity: null,
          categoryId: null,
          category: null,
          tags: [],
          publishYear: null,
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/shopping/paper-books/@{paper_book_id}`,
        method: 'delete',
        query: {
          paper_book_id: null
        }
      },
      collection: `${testOrigin}/api/backend/shopping/paper-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      collectionByIds: `${testOrigin}/api/backend/shopping/paper-books/by-ids?ids=@{ids}`,
    },
    topic: {
      delete: {
        url: `${testOrigin}/api/backend/contents/topics/@{topic_id}`,
        query: {
          topic_id: null
        }
      },
      collection: `${testOrigin}/api/backend/contents/topics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    review: {
      collection: `${testOrigin}/api/backend/contents/reviews?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    tag: {
      create: {
        url: `${testOrigin}/api/backend/classification/tags`,
        method: 'post',
        body: {
          name: null
        }
      },
      update: {
        url: `${testOrigin}/api/backend/classification/tags/@{tag_id}`,
        method: 'put',
        query: {
          tag_id: null
        },
        body: {
          name: null
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/classification/tags/@{tag_id}`,
        method: 'delete',
        query: {
          tag_id: null
        }
      },
      collection: `${testOrigin}/api/backend/classification/tags?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    },
    collection: {
      suggestion: `${testOrigin}/api/backend/classification/collections/suggestion?keyword=@{keyword}`,
      create: {
        url: `${testOrigin}/api/backend/classification/collections`,
        method: 'post',
        body: {
          name: null,
          description: null,
          extra: null,
          tags: []
        }
      },
      update: {
        url: `${testOrigin}/api/backend/classification/collections/@{collection_id}`,
        method: 'put',
        query: {
          collection_id: null,
        },
        body: {
          name: null,
          description: null,
          extra: null,
          tags: []
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/classification/collections/@{collection_id}`,
        method: 'delete',
        query: {
          collection_id: null
        }
      },
      collection: `${testOrigin}/api/backend/classification/collections?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    category: {
      create: {
        url: `${testOrigin}/api/backend/classification/categories`,
        method: 'post',
        body: {
          name: null,
          description: null,
          tags: []
        }
      },
      update: {
        url: `${testOrigin}/api/backend/classification/categories/@{category_id}`,
        method: 'put',
        query: {
          category_id: null,
        },
        body: {
          name: null,
          description: null,
          tags: []
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/classification/categories/@{category_id}`,
        method: 'delete',
        query: {
          category_id: null
        }
      },
      collection: `${testOrigin}/api/backend/classification/categories?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    comment: {
      delete: `${testOrigin}/api/backend/contents/commnents/@{comment_id}`,
      collection: `${testOrigin}/api/backend/contents/comments?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    role: {
      create: {
        url: `${testOrigin}/api/backend/system/roles`,
        method: 'post',
        body: {
          name: null,
          authorities: null
        }
      },
      update: {
        url: `${testOrigin}/api/backend/system/roles/@{role_id}`,
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
        url: `${testOrigin}/api/backend/system/roles/@{role_id}`,
        method: 'delete',
        query: {
          role_id: null
        }
      },
      suggestion: `${testOrigin}/api/backend/system/roles/suggestion?keyword=@{keyword}`,
      collection: `${testOrigin}/api/backend/system/roles?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    user: {
      create: {
        url: `${testOrigin}/api/backend/system/users`,
        method: 'post',
        body: {
          roleId: null,
          extra: {
            slogan: '这个人很懒...',
            introduction: '这个人懒到来没写简介...',
          },
          avatar: null,
          username: null,
          nickname: null,
        }
      },
      delete: {
        url: `${testOrigin}/api/backend/system/users/@{user_id}`,
      },
      update: {
        url: `${testOrigin}/api/backend/system/users/@{user_id}`,
        method: 'put',
        body: {
          roleId: null,
          extra: {
            slogan: '这个人很懒...',
            introduction: '这个人懒到来没写简介...',
          },
          avatar: null,
          username: null,
          nickname: null,
        }
      },
      collection: `${testOrigin}/api/backend/system/users?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    },
    commodity: {
      create: {
        url: `${testOrigin}/api/backend/shopping/commodities`,
        method: 'post',
        body: {
          name: null,
          type: null,
          picture: null,
          introduction: null,
          weight: null,
          stock: null,
          shipment: 0,
          extra: null,
          prices: 0,
          status: null,
        }
      },
      update: {
        url: `${testOrigin}/api/backend/shopping/commodities/@{commodity_id}`,
        method: 'put',
        body: {
          name: null,
          type: null,
          picture: null,
          introduction: null,
          weight: null,
          stock: null,
          shipment: 0,
          extra: null,
          prices: 0,
          status: null,
        }
      },
      delete: `${testOrigin}/api/backend/shopping/commodities/@{commodity_id}`,
      collection: `${testOrigin}/api/backend/shopping/commodities?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
    }
  },
  creator: {
    statistics: `${origin}/api/creator/statistics`,
    audioBook: {
      search: `${testOrigin}/api/creator/audio-books/search?keyword=@{keyword}`,
      collection: `${testOrigin}/api/creator/audio-books?filter=null&sorter=null&page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/creator/audio-books/@{audio_book_id}`,
      catalogs: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/catalogs`,
      create: {
        url: `${testOrigin}/api/creator/audio-books`,
        method: 'post',
        body: {
          title: null,
          teller: null,
          cover: null,
          description: null,
          metadataId: null,
          categoryId: null,
          category: null,
          tags: [],
        }
      },
      update: {
        url: `${testOrigin}/api/creator/audio-books/@{audio_book_id}`,
        method: 'put',
        query: {
          audio_book_id: null,
        },
        body: {
          title: null,
          teller: null,
          cover: null,
          description: null,
          metadataId: null,
          categoryId: null,
          category: null,
          tags: [],
        }
      },
      delete: {
        url: `${testOrigin}/api/creator/audio-books/@{audio_book_id}`,
        method: 'delete',
        query: {
          audio_book_id: null
        }
      },
      episode: {
        lastUpdatedEpisode: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/last-updated-episode`,
        entity: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/@{episode_id}`,
        create: {
          url: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes`,
          query: {
            audio_book_id: null,
          },
          body: {
            title: null,
            status: null,
            streamUrl: null,
            episodeId: null
          }
        },
        update: {
          url: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/@{episode_id}`,
          query: {
            audio_book_id: null,
            episode_id: null,
          },
          body: {
            title: null,
            streamUrl: null,
            status: null,
            episodeId: null
          }
        },
        delete: {
          url: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/@{episode_id}`,
          query: {
            audio_book_id: null,
            episode_id: null
          },
          body: {

          }
        },
        collection: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes?filter=null&sorter=null&page=@{page}&limit=@{limit}`
      },
    },
    electronicBook: {
      create: {
        url: `${testOrigin}/api/creator/electronic-books`,
        body: {
          metadataId: null,
          metadata: null,
          categoryId: null,
          category: null,
          tags: []
        }
      },
      update: {
        url: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}`,
        query: {
          electronic_book_id: null
        },
        body: {
          metadataId: null,
          metadata: null,
          categoryId: null,
          category: null,
          tags: []
        }
      },
      delete: {
        url: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}`,
        query: {
          electronic_book_id: null
        }
      },
      episode: {
        create: {
          url: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/episodes`,
          method: 'post',
          query: {
            electronic_book_id: null,
          },
          body: {
            title: null,
            content: null,
            words: null,
            status: null,
            episodeNumber: null,
          }
        },
        update: {
          url: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/episodes/@{episode_id}`,
          method: 'put',
          query: {
            electronic_book_id: null,
            episode_id: null,
          },
          body: {
            title: null,
            content: null,
            words: null,
            status: null,
            episodeNumber: null,
          }
        },
        delete: {
          url: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/episodes/@{episode_id}`,
          method: 'delete',
          query: {
            electronic_book_id: null,
            episode_id: null,
          }
        },
        entity: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/episodes/@{episode_id}`,
        lastEpisodeNumber: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/episodes/last-episode-number`,
        lastUpdatedEpisode: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/episodes/last-updated-episode`,
      },
      catalogs: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}/catalogs`,
      entity: `${testOrigin}/api/creator/electronic-books/@{electronic_book_id}`,
      search: `${testOrigin}/api/creator/electronic-books/search?keyword=@{keyword}`,
      collection: `${testOrigin}/api/creator/electronic-books?filter=null&sorter=null&page=@{page}&limit=@{limit}`
    },
  },
  community: {
    dynamic: {
      collection: {
        url: `${testOrigin}/api/community/dynamics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
      }
    },
    topic: {
      collection: {
        url: `${testOrigin}/api/community/topics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
      }
    },
    review: {
      collection: {
        url: `${testOrigin}/api/community/reviews?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
      }
    },
  },
  common: {
    mostRead: `${testOrigin}/api/common/most-read?type=@{type}&page=@{page}&limit=@{limit}`,
    recommends: `${testOrigin}/api/common/recommends?page=@{page}&limit=@{limit}`
  },
  comprehensivePage: {
    categories: `${testOrigin}/api/comprehensive-page/categories`,
    collections: `${testOrigin}/api/comprehensive-page/collections`,
  },
  search: {
    url: `${origin}/api/search?kw=@{keyword}&type=@{type}`
  },
  electronicBook: {
    search: `${testOrigin}/api/electronic-books/search?q=@{keyword}`,
    entity: `${testOrigin}/api/electronic-books/@{book_id}`,
    lastUpdate: `${testOrigin}/api/electronic-books/@{book_id}/last-updated-episode`,
    comments: `${origin}/api/electronic-books/@{book_id}/comments?page=@{page}&limit=@{limit}`,
    catalogs: `${testOrigin}/api/electronic-books/@{book_id}/catalogs`,
    episode: {
      suggestion: `${testOrigin}/api/creator/episodes/suggestion?keyword=@{keyword}`,
      lastRead: `${testOrigin}/api/electronic-books/@{book_id}/episodes/last-read`,
      collection: `${testOrigin}/api/electronic-books/@{book_id}/episodes?page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/electronic-books/@{book_id}/episodes/@{episode_id}`,
    },
    collection: `${testOrigin}/api/electronic-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    publishYears: `${testOrigin}/api/electronic-books/publish-years`
  },
  audioBook: {
    search: `${testOrigin}/api/audio-books/search?q=@{keyword}`,
    entity: `${testOrigin}/api/audio-books/@{book_id}`,
    catalogs: `${testOrigin}/api/audio-books/@{book_id}/catalogs`,
    lastUpdate: `${testOrigin}/api/audio-books/@{book_id}/last-update`,
    comments: `${testOrigin}/api/audio-books/@{book_id}/comments?page=@{page}&limit=@{limit}`,
    episode: {
      lastRead: `${testOrigin}/api/audio-books/@{book_id}/episodes/last-read`,
      collection: `${testOrigin}/api/audio-books/@{book_id}/episodes?page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/audio-books/@{book_id}/episodes/@{episode_id}`,
    },
    collection: {
      url: `${testOrigin}/api/audio-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      query: {
        filter: null,
        sorter: null
      }
    },
    publishYears: `${testOrigin}/api/audio-books/publish-years`
  },
  paperBook: {
    entity: `${testOrigin}/api/paper-books/@{book_id}`,
    collection: {
      url: `${testOrigin}/api/paper-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      query: {
        filter: null
      }
    },
    publishYears: `${testOrigin}/api/paper-books/publish-years`
  },
  bookMetadata: {
    suggestion: {
      url: `${testOrigin}/api/book-metadatas/suggestion?keyword=@{keyword}`,
      method: 'get',
      query: {
        keyword: null
      }
    }
  },
  tag: {
    collection: `${origin}/api/tags`,
    suggestion: {
      url: `${testOrigin}/api/tags/suggestion?keyword=@{keyword}`,
      query: {
        keyword: ''
      }
    }
  },
  category: {
    related: `${testOrigin}/api/categories/related-by-book-type?type=@{type}`,
    collection: `${testOrigin}/api/categories`,
    suggestion: `${testOrigin}/api/categories/suggestion?keyword=@{keyword}`,
    exhibited: {
      collection: `${origin}/api/categories/exhibited`
    },
    entity: `${origin}/api/categories/@{category_id}`,
    items: {
      collection: `${origin}/api/categories/@{category_id}/items?page=@{page}&limit=@{limit}&filter=@{filter}`,
      mostread: `${origin}/api/categories/@{category_id}/items/most-read`,
      recommends: `${origin}/api/categories/@{category_id}/items/recommends`,
    },
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
        url: `${testOrigin}/api/contents/@{content_id}/comments`,
        method: 'post',
        query: {
          content_id: null,
        },
        body: {
          content: null,
          mentions: [],
          rate: 0,
        }
      },
      like: {
        url: `${testOrigin}/api/contents/@{content_id}/like`,
        method: 'post',
        query: {
          content_id: null
        }
      },
      unlike: {
        url: `${testOrigin}/api/contents/@{content_id}/unlike`,
        method: 'post',
        query: {
          content_id: null
        }
      },
      collection: `${testOrigin}/api/contents/@{content_id}/comments?page=@{page}&limit=@{limit}`,
    }
  },
  user: {
    notification: {
      read: {
        collection: `${testOrigin}/api/user/notifications/reads?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
        query: {
          filter: null,
          sorter: null
        }
      },
      unread: {
        collection: `${testOrigin}/api/user/notifications/unreads?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
        query: {
          filter: null,
          sorter: null
        }
      },
      markAsRead: {
        url: `${testOrigin}/api/user/notifications/@{notification_id}/read`,
        method: 'post',
        query: {
          notification_id: null
        },
        body: {}
      },
      markAllRead: {
        url: `${testOrigin}/api/user/notifications/mark-as-read-bulk`,
        method: 'post',
        body: {
          ids: []
        }
      },
    },
    account: {
      balance: `${testOrigin}/api/user/account`,
      recharge: {
        url: `${testOrigin}/api/user/account/recharge`,
        method: 'post',
        body: {
          charge: null
        }
      },
      rechargePay: {
        url: `${testOrigin}/api/user/account/pay`,
        method: 'post',
        body: {
          orderNumber: null,
          type: null
        }
      }
    },
    arrive: {
      signin: {
        url: `${testOrigin}/api/user/arrive/signin`,
        method: 'post',
        body: {
          date: null
        }
      },
      today: `${testOrigin}/api/user/arrive/today`
    },
    community: {
      review: {
        create: {
          url: `${testOrigin}/api/user/community/reviews`,
          method: 'post',
          body: {
            title: null,
            content: {
              type: 'html',
              source: ''
            },
            references: []
          }
        },
        update: {
          url: `${testOrigin}/api/user/community/reviews/@{review_id}`,
          method: 'put',
          query: {
            review_id: null
          },
          body: {
            title: null,
            content: {
              type: 'html',
              source: ''
            },
            references: []
          }
        },
      },
      topic: {
        create: {
          url: `${origin}/api/user/community/topics`,
          method: 'post',
          body: {
            title: null,
            content: {
              type: 'html',
              source: ''
            },
            references: []
          }
        },
        update: {
          url: `${origin}/api/user/community/topics/@{topic_id}`,
          method: 'put',
          query: {
            topic_id: null
          },
          body: {
            title: null,
            content: {
              type: 'html',
              source: ''
            },
            references: []
          }
        },
      },
      dynamic: {
        collection: `${testOrigin}/api/user/community/dynamics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
      }
    },
    logout: `${origin}/api/user/logout`,
    logged: `${testOrigin}/api/user/logged`,
    profile: `${testOrigin}/api/user/profile`,
    bookNotes: {
      entity: `${testOrigin}/api/user/book-notes/@{book_id}`,
      collection: `${testOrigin}/api/user/book-notes?filter=@{filter}&@sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      create: {
        url: `${testOrigin}/api/user/book-notes`,
        method: 'post',
        body: {
          bookId: null,
          episodeId: null,
          ref: '',
          content: null,
          dommark: null
        }
      }
    },
    address: {
      default: `${testOrigin}/api/user/addresses/default`,
      entity: `${testOrigin}/api/user/addresses/@{address_id}`,
      collection: `${testOrigin}/api/user/addresses?filter=null&sorter=null&page=@{page}&limit=@{limit}`,
      update: {
        url: `${testOrigin}/api/user/addresses/@{address_id}`,
        method: 'post',
        body: {
          address: null,
          region: null,
          receiver: null,
          postcode: null
        }
      },
      makeDefault: {
        url: `${testOrigin}/api/user/addresses/default`,
        method: 'post',
        body: {
          addressId: null
        }
      },
      create: {
        url: `${testOrigin}/api/user/addresses`,
        method: 'post',
        body: {
          address: null,
          region: null,
          receiver: null,
          postcode: null
        }
      },
      delete: {
        url: `${testOrigin}/api/user/addresses/@{address_id}`,
        method: 'delete'
      }
    },
    order: {
      collection: `${testOrigin}/api/user/orders?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/user/orders/@{order_number}`,
      pay: {
        url: `${testOrigin}/api/user/account/pay`,
        method: 'post',
        body: {
          orderNumber: null,
          type: null,
          password: null
        }
      },
      orderring: {
        url: `${testOrigin}/api/user/orders/orderring`,
        body: {
          addressId: null,
          type: null,
          items: null
        }
      }
    },
    cart: {
      items: `${testOrigin}/api/user/cart?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      itemsByIds: `${testOrigin}/api/user/cart/by-ids?ids=@{ids}`,
      item: {
        delete: {
          url: `${testOrigin}/api/user/cart/@{cart_item_id}`,
          method: 'delete',
          query: {
            cart_item_id: null
          }
        }
      },
      totalCount: `${testOrigin}/api/user/cart/total-count`,
      join: {
        url: `${testOrigin}/api/user/cart/join`,
        body: {
          commodityId: null,
          quantity: 1,
        }
      }
    },
    shelf: {
      cells: {
        url: `${testOrigin}/api/user/shelves/default/cells?page=@{page}&limit=@{limit}`,
      },
      join: {
        url: `${testOrigin}/api/user/shelves/default/join?book_id=@{book_id}`,
        query: {
          book_id: null
        }
      }
    },
    subscribe: {
      collection: `${testOrigin}/api/user/subscribes?page=@{page}&limit=@{limit}`,
      unsubscribe: {
        url: `${testOrigin}/api/user/subscribes/@{subscribe_id}/unsubscribe`,
        method: 'post',
        query: {
          subscribe_id: null
        },
        body: {}
      },
      create: {
        url: `${testOrigin}/api/user/subscribes`,
        method: 'post',
        body: {
          type: '',
          book_id: null,
        }
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
    signIn: {
      url: `${testOrigin}/api/system/sign-in`,
      method: 'post',
      body: {
        username: null,
        password: null,
        rememberMe: false
      }
    },
    signOut: {
      url: `${testOrigin}/api/system/sign-out`,
      method: 'post',
    },
    signUp: `${testOrigin}/api/system/sign-up`,
    usernameExists: `${testOrigin}/api/system/username-exists?username=@{username}`,
    nicknameExists: `${testOrigin}/api/system/nickname-exists?nickname=@{nickname}`,
    realtime: `${origin}/api/system/realtime`
  }
}

export default {};