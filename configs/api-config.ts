import { ElectronicBookStatus } from "../types/electronic-book";
import { FRONTEND_HOSTNAME, BACKEND_HOSTNAME } from './host-config';

let browserWindow = null;
if (typeof window == 'object') {
  browserWindow = window;
} else {
  browserWindow = {
    location: {
      protocol: 'http',
      hostname: FRONTEND_HOSTNAME,
      port: '3000'
    }
  }
}

// For IE
if (!browserWindow.location.origin) {
  browserWindow.location.origin = browserWindow.location.protocol + "://" + browserWindow.location.hostname + (browserWindow.location.port ? ':' + browserWindow.location.port : '');
}

var origin: string = browserWindow.location.origin;
var testOrigin = `${browserWindow.location.protocol}://${browserWindow.location.hostname}:4000`;
if (BACKEND_HOSTNAME) {
  testOrigin = `${browserWindow.location.protocol}://${BACKEND_HOSTNAME}:4000`;
}


export interface APIDefinition {
  url: string,
  method?: "get" | "post" | "put" | "delete",
  query?: any,
  body?: any,
}

export interface APIDefinitionSet {
  [x: string]: any | APIDefinition | APIDefinitionSet;
}

/**
 * for using API in netwok-util
 */
/**
 * for using API in netwok-util
 */
export enum API {
  ServerOrigin = "origin",
  UserCollection = "user.collection",
  LoggedUserData = "user.logged",
  BookJoinCart = "cart.join",
  BookJoinShelf = "shelf.join",
  CategoryCollection = 'category.collection',
  // category
  CategoryBookTypeRelated = 'category.related',
  CategoryEntity = 'category.entity',
  CategoryItemsCollection = "category.items.collection",
  CategoryAlbumCollection = "category.album.collection",
  DiscoverCollection = 'discover.collection',
  // book
  BackendBookSuggestion = "backend.book.suggestion",
  ElectronicBookCollection = "electronicBook.collection",
  ElectronicBookEntity = "electronicBook.entity",
  ElectronicBookLastUpdate = "electronicBook.lastUpdate",
  ElectronicBookPublishYears = "electronicBook.publishYears",
  ElectronicBookEpisodeEntity = "electronicBook.episode.entity",
  ElectronicBookFirstEpisode = "electronicBook.episode.firstEpisode",
  ElectronicBookCatalogs = "electronicBook.catalogs",
  ElectronicBookEpisodeCreate = "ElectronicBookEpisodeCreate",
  ElectronicBookLastEditedEpisode = "electronicBook.lastUpdate",
  AudioBookFirstEpisode = "audioBook.episode.firstEpisode",
  AudioBookEpisodeEntity = "audioBook.episode.entity",
  AudioBookEntity = "audioBook.entity",
  AudioBookLastUpdate = "audioBook.lastUpdate",
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
  BookEntity = "book.entity",
  SystemRealtime = "system.realtime",
  // user
  UserHitTag = "user.buryingPoint.hitTag",
  UserOrderEntity = "user.order.entity",
  UserOrderCollection = "user.order.collection",
  UserOrderring = "user.order.orderring",
  UserCartJoin = "user.cart.join",
  UserAddressDefault = "user.address.default",
  UserAddressMakeDefault = "user.address.makeDefault",
  UserOrderPay = "user.order.pay",
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
  // reader
  ReaderHistoryRecord = "reader.history.recordHistory",
  ReaderHistoryLastRead = "reader.history.lastRead",
  ReaderHistoryEpisode = "reader.history.episode",
  // player
  PlayerHistoryRecord = "player.history.recordHistory",
  PlayerHistoryLastRead = "player.history.lastRead",
  PlayerHistoryEpisode = "player.history.episode",
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
  ReviewCreate = "review.create",
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
  Upload = "upload.url",
  UploadSource = "upload.source",
  AvatarSource = "upload.avatar",
  CoverSource = "upload.cover",
  CategorySuggetion = "category.suggestion",
  TagSuggetion = "tag.suggestion",
  ElectronicBookEpisodeUpdate = "ElectronicBookEpisodeUpdate",
  AudioBookCreate = "audioBook.entity",
  BookMetadataSuggestion = "bookMetadata.suggestion",
  // creator

  // creator dashboard
  CreatorDashboardCreativeStatistics = "creator.dashboard.creativeStatistics",
  CreatorDashboardCreativeCategoryStatistics = "creator.dashboard.creativeCategoryStatistics",
  CreatorDashboardAuthorStatistics = "creator.dashboard.authorStatistics",
  CreatorDashboardBookCreativeStatistics = "creator.dashboard.bookReadingStatistics",
  //
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

  // backend dashboard
  BackendDashboardPaperBookSales = "backend.dashboard.paperBookSales",
  BackendDashboardUserBookPreference = "backend.dashboard.userBookPreference",
  BackendDashboardBookCategoryCount = "backend.dashboard.bookCategoryCount",
  BackendDashboardBookCategoryDistribution = "backend.dashboard.bookCategoryDistribution",
  BackendDashboardPlatformDataStatistics = "backend.dashboard.platformDataStatistics",
  BackendDashboardOnlineUsers = "backend.dashboard.onlineUsers",
  
  BackendOrderCollection = "backend.order.collection",
  BackendOrderLogisticsInformationUpdate = "backend.order.logisticsInformation.update",
  BackendOrderChargeback = "backend.order.chargeback",
  BackendTopicCollection = "backend.topic.collection",
  BackendContentAcceptExamination = "backend.content.accept",
  BackendContentRejectExamination = "backend.content.reject",
  BackendContentBulkAcceptExamination = "backend.content.bulkAccept",
  BackendContentBulkRejectExamination = "backend.content.bulkReject",
  BackendTopicEntity = "backend.topic.entity",
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
  BackendUserEntity = "backend.user.entity",
  BackendUserCollection = "backend.user.collection",
  BackendUserDelete = "backend.user.delete",
  BackendUserResetPassword = "backend.user.resetPassword",
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
  BackendAudioBookEpisodeLastNumber = "backend.audioBook.episode.lastEpisodeNumber",
  BackendAudioBookEpisodeDelete = "backend.audioBook.episode.delete",
  BackendActivityCollection = "backend.activity.collection",
  BackendActivityCreate = "backend.activity.create",
  BackendActivityDelete = "backend.activity.delete",
  BackendActivityUpdate = "backend.activity.update",
  BackendAudioBookEpisodeCreate = "backend.audioBook.episode.create",
  BackendAudioBookEpisodeUpdate = "backend.audioBook.episode.update",
  BackendCommentDelete = "backend.comment.delete",
  BackendCommentBulkDelete = "backend.comment.bulkDelete",
  BackendTagCollection = "backend.tag.collection",
  BackendTagCreate = "backend.tag.create",
  BackendTagUpdate = "backend.tag.update",
  BackendTagDelete = "backend.tag.delete",
  BackendCollectionSuggestion = "backend.collection.suggestion",
  BackendCollectionCollection = "backend.collection.collection",
  BackendCollectionCreate = "backend.collection.create",
  BackendCollectionUpdate = "backend.collection.update",
  BackendCollectionDelete = "backend.collection.delete",
  BackendCollectionBulkDelete = "backend.collection.bulkDelete",
  BackendComprehensivePage = "backend.comprehensivePage",
  ComprehensivePageCategories = "comprehensivePage.categories",
  ComprehensivePageCollections = "comprehensivePage.collections",
  CommoditySearch = "CommoditySearch",
  CategoryExhibitedCollection = "category.exhibited.collection",
  CategorySuggestion = "category.suggestion",
  RecommendationInteresting = "recommendation.interesting",
  RecommendationSameInteresting = "recommendation.sameInteresting",
  ElectronicBookEpisodeSuggestion = "electronicBook.episode.suggestion",
  ElectronicBookComments = "electronic.book.comments",
  UserNotificationCollection = "user.notification.collection",
  UserNotificationMarkAsRead = "user.notification.markAsRead",
  UserNotificationReadCollection = "user.notification.read.collection",
  UserNotificationUnreadCollection = "user.notification.unread.collection",
  CommunityDynamicCollection = "community.dynamic.collection",
  CommunityTopicCollection = "community.topic.collection",
  CommunityReviewCollection = "community.review.collection",
  UserCommunityTopicCreate = "user.community.topic.create",
  UserCommunityTopicEntity = "user.community.topic.entity",
  UserCommunityTopicUpdate = "user.community.topic.update",
  UserCommunityReviewCreate = "user.community.review.create",
  UserCommunityReviewEntity = "user.community.review.entity",
  UserCommunityReviewUpdate = "user.community.review.update",
  UserDynamicCollection = "user.community.dynamic.collection",
  UserNotificationMarkAsReadBulk = "user.notification.markAllRead",
  UserAccountBalance = "user.account.balance",
  UserAccountRecharge = "user.account.recharge",
  UserAccountRechargePay = "user.account.rechargePay",
  SystemSignOut = "system.signOut",
  UserCartItems = "user.cart.items",
  UserCartItemsTotalCount = "user.cart.totalCount",
  UserCartItemDelete = "user.cart.item.delete",
  UserCartItemBulkDelete = "user.cart.item.bulkDelete",
  UserCartItemsByIds = "user.cart.itemsByIds",
  PaperBookCollectionByIds = "paperBook.collectionByIds",
  BackendUserFigureTagCollection = "backend.userFigure.tag.collection",
  BackendUserFigureTagDelete = "backend.userFigure.tag.delete",
  BackendUserFigureTagCreate = "backend.userFigure.tag.create",
  BackendUserFigureTagMostInteresting = "backend.userFigure.tag.mostInteresting",
  BackendUserFigureSimilarUserCollection = "backend.userFigure.similarUser.collection",
  RecommendationByBookType = "recommendation.byBookType",
  RecommendationByBook = "recommendation.byBook",
  RecommendationByUser = "recommendation.byUser",
  RecommendationByCategory = "recommendation.byCategory",
  RecommendationByTag = "recommendation.byTag",
  CommunityReviewHotCollection = "community.review.hotCollection",
  CommunityTopicHotCollection = "community.topic.hotCollection",
  BackendCollectionStatistics = "backend.collection.statistics",
  AudioBookHotCollection = "audioBook.hotCollection",
  PaperbookHotCollection = "paperBook.hotCollection",
  ElectronicBookHotCollection = "electronicBook.hotCollection",
  UserOrderShipment = "user.order.shipment",
  UserOrderCancel = "user.order.cancel",
  UserOrderReceived = "user.order.received",
  UserOrderLogisticsInformation = "user.order.logisticsInformation",
  UserOrderEvaluate = "user.order.evaluate",
  BackendUserBulkDelete = "backend.user.bulkDelete"
}

/**
 * API definitions, it is url plus placeholder really.
 * 
 * plachholder starts with '@{' and ends with '}'.
 * body used as request body
 */
export const APIDefinitionData: APIDefinitionSet = {
  backend: {
    dashboard: {
      platformDataStatistics: `${testOrigin}/api/backend/dashboard/platform-statistics`,
      userBookPreference: `${testOrigin}/api/backend/dashboard/user-book-preference`,
      bookCategoryDistribution: `${testOrigin}/api/backend/dashboard/book-category-distribution`,
      bookCategoryCount: `${testOrigin}/api/backend/dashboard/book-category-count`,
      paperBookSales: `${testOrigin}/api/backend/dashboard/paper-book-sales`,
      onlineUsers: `${testOrigin}/api/backend/dashboard/online-users?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    },
    comprehensivePage: {
      url: `${testOrigin}/api/backend/comprehensive-page`,
      method: 'post',
      body: {
        categoryIds: [],
        collectionIds: [],
      }
    },
    userFigure: {
      similarUser: {
        collection: `${testOrigin}/api/backend/user-figures/@{user_id}/similar-users?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
      },
      tag: {
        create: {
          url: `${testOrigin}/api/backend/user-figures/@{user_id}/tags`,
          method: 'post',
          body: {
            tags: []
          }
        },
        delete: {
          url: `${testOrigin}/api/backend/user-figures/@{user_id}/tags/@{figure_tag_id}`,
          method: 'delete',
          query: {
            figure_tag_id: null
          }
        },
        mostInteresting: `${testOrigin}/api/backend/user-figures/@{user_id}/tags/most-interesting`,
        collection: `${testOrigin}/api/backend/user-figures/@{user_id}/tags?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`
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
      chargeback: {
        url: `${testOrigin}/api/backend/shopping/orders/@{order_number}/chargeback`,
        query: {
          order_number: null
        },
        method: 'delete'
      },
      logisticsInformation: {
        update: {
          url: `${testOrigin}/api/backend/shopping/orders/@{order_number}/logistics-information`,
          method: 'post',
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
        delete: {
          url: `${testOrigin}/api/backend/contents/electronic-books/@{book_id}/episodes/@{episode_id}`,
          query: {
            book_id: null,
            episode_id: null
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
            mediaNumber: null,
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
            mediaNumber: null,
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
        lastEpisodeNumber: `${testOrigin}/api/backend/contents/audio-books/@{book_id}/episodes/last-episode-number`,
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
          specification: null,
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
          specification: null,
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
    content: {
      accept: {
        url: `${testOrigin}/api/backend/contents/@{content_id}/accept`,
        method: 'post',
        query: {
          topic_id: null
        },
        body: {
          reason: null
        }
      },
      bulkAccept: {
        url: `${testOrigin}/api/backend/contents/@{content_id}/accept`,
        method: 'post',
        body: {
          ids: [],
          reason: null
        }
      },
      reject: {
        url: `${testOrigin}/api/backend/contents/@{content_id}/reject`,
        method: 'post',
        query: {
          topic_id: null
        },
        body: {
          reason: null
        }
      },
      bulkReject: {
        url: `${testOrigin}/api/backend/contents/reject`,
        method: 'post',
        body: {
          ids: [],
          reason: null
        }
      },
    },
    topic: {
      delete: {
        url: `${testOrigin}/api/backend/contents/topics/@{topic_id}`,
        method: 'delete',
        query: {
          topic_id: null
        }
      },
      entity: {
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
      statistics: `${testOrigin}/api/backend/classification/collections/@{collection_id}/statistics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
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
      delete: `${testOrigin}/api/backend/contents/comments/@{comment_id}`,
      bulkDelete: {
        url: `${testOrigin}/api/backend/contents/comments`,
        method: 'delete',
        body: {
          ids: []
        }
      },
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
      entity: `${testOrigin}/api/backend/system/users/@{user_id}`,
      bulkDelete: {
        url: `${testOrigin}/api/backend/system/users`,
        method: 'delete',
        body: {
          ids: []
        }
      },
      resetPassword: {
        url: `${testOrigin}/api/backend/system/users/@{user_id}/reset-password`,
        method: 'post',
        query: {
          user_id: null
        },
        body: {
          password: null
        }
      },
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
    dashboard: {
      creativeCategoryStatistics: `${testOrigin}/api/creator/dashboard/creative-category-statistics`,
      creativeStatistics: `${testOrigin}/api/creator/dashboard/creative-statistics`,
      bookReadingStatistics: `${testOrigin}/api/creator/dashboard/book-reading-statistics`,
    },
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
        lastEpisodeNumber: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/last-episode-number`,
        lastUpdatedEpisode: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/last-updated-episode`,
        entity: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes/@{episode_id}`,
        create: {
          url: `${testOrigin}/api/creator/audio-books/@{audio_book_id}/episodes`,
          query: {
            audio_book_id: null,
          },
          body: {
            title: null,
            mediaNumber: null,
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
            mediaNumber: null,
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
      collection: `${testOrigin}/api/community/topics?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      hotCollection: `${testOrigin}/api/community/topics/hots?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    },
    review: {
      collection: `${testOrigin}/api/community/reviews?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      hotCollection: `${testOrigin}/api/community/reviews/hots?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    },
  },
  recommendation: {
    byBookType: `${testOrigin}/api/recommendation/by-book-type?type=@{type}&filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    byBook: `${testOrigin}/api/recommendation/by-book?book_id=@{book_id}&filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    byCategory: `${testOrigin}/api/recommendation/by-category?category_id=@{category_id}&filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    byTag: `${testOrigin}/api/recommendation/by-tag?tag_id=@{tag_id}&filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    byUser: `${testOrigin}/api/recommendation/by-user?user_id=@{user_id}&filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
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
    url: `${testOrigin}/api/search?kw=@{keyword}&type=@{type}&filter=null&sorter=null&page=1&limit=10`
  },
  electronicBook: {
    search: `${testOrigin}/api/electronic-books/search?q=@{keyword}`,
    entity: {
      url: `${testOrigin}/api/electronic-books/@{book_id}?details=@{details}`,
      query: {
        book_id: null,
        details: false
      }
    },
    lastUpdate: `${testOrigin}/api/electronic-books/@{book_id}/last-updated-episode`,
    comments: `${origin}/api/electronic-books/@{book_id}/comments?page=@{page}&limit=@{limit}`,
    catalogs: `${testOrigin}/api/electronic-books/@{book_id}/catalogs`,
    episode: {
      suggestion: `${testOrigin}/api/creator/episodes/suggestion?keyword=@{keyword}`,
      firstEpisode: `${testOrigin}/api/electronic-books/@{book_id}/episodes/first-episode`,
      collection: `${testOrigin}/api/electronic-books/@{book_id}/episodes?page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/electronic-books/@{book_id}/episodes/@{episode_id}`,
    },
    hotCollection: `${testOrigin}/api/electronic-books/hots?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    collection: `${testOrigin}/api/electronic-books?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    publishYears: `${testOrigin}/api/electronic-books/publish-years`
  },
  audioBook: {
    search: `${testOrigin}/api/audio-books/search?q=@{keyword}`,
    entity: `${testOrigin}/api/audio-books/@{book_id}`,
    catalogs: `${testOrigin}/api/audio-books/@{book_id}/catalogs`,
    lastUpdate: `${testOrigin}/api/audio-books/@{book_id}/last-updated-episode`,
    comments: `${testOrigin}/api/audio-books/@{book_id}/comments?page=@{page}&limit=@{limit}`,
    episode: {
      firstEpisode: `${testOrigin}/api/audio-books/@{book_id}/episodes/first-episode`,
      collection: `${testOrigin}/api/audio-books/@{book_id}/episodes?page=@{page}&limit=@{limit}`,
      entity: `${testOrigin}/api/audio-books/@{book_id}/episodes/@{episode_id}`,
    },
    hotCollection: {
      url: `${testOrigin}/api/audio-books/hots?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
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
    hotCollection: {
      url: `${testOrigin}/api/paper-books/hots?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    },
    publishYears: `${testOrigin}/api/paper-books/publish-years`
  },
  book: {
    entity: `${testOrigin}/api/books/@{book_id}`,
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
    collection: `${testOrigin}/api/categories?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
    suggestion: `${testOrigin}/api/categories/suggestion?keyword=@{keyword}`,
    exhibited: {
      collection: `${origin}/api/categories/exhibited`
    },
    entity: `${testOrigin}/api/categories/@{category_id}`,
    items: {
      collection: `${testOrigin}/api/categories/@{category_id}/items?page=@{page}&limit=@{limit}&filter=@{filter}&sorter=@{sorter}`,
    },
    album: {
      collection: `${testOrigin}/api/categories/@{category_id}/album?page=@{page}&limit=@{limit}&filter=@{filter}&sorter=@{sorter}`,
    },
  },
  reader: {
    history: {
      episode: {
        url: `${testOrigin}/api/user/reader/history?book_id=@{bookId}&episode_id=@{episodeId}`,
        method: 'get',
      },
      lastRead: {
        url: `${testOrigin}/api/user/reader/history/last-read?book_id=@{bookId}`,
        method: 'get'
      },
      recordHistory: {
        url: `${testOrigin}/api/user/reader/history`,
        method: 'post',
        body: {
          bookId: null,
          episodeId: null,
          progress: 0.0
        }
      }
    }
  },
  player: {
    history: {
      episode: {
        url: `${testOrigin}/api/user/player/history?book_id=@{bookId}&episode_id=@{episodeId}`,
        method: 'get',
      },
      lastRead: {
        url: `${testOrigin}/api/user/player/history/last-read?book_id=@{bookId}`,
        method: 'get'
      },
      recordHistory: {
        url: `${testOrigin}/api/user/player/history`,
        method: 'post',
        body: {
          bookId: null,
          audioEpisodeId: null,
          progress: 0.0
        }
      }
    }
  },
  dynamic: {
    collection: `${origin}/api/dynamics?limit=@{limit}&page=@{page}`
  },
  review: {
    entity: `${testOrigin}/api/community/reviews/@{review_id}`,
    collection: `${testOrigin}/api/community/reviews?limit=@{limit}&page=@{page}`
  },
  topic: {
    create: {
      url: `${testOrigin}/api/user/community/topics`,
      method: 'post',
      body: {
        title: null,
        words: null,
        status: null,
        content: null,
        references: []
      }
    },
    update: {
      url: `${testOrigin}/api/user/community/topics/@{topic_id}`,
      method: 'put',
      body: {
        title: null,
        words: 0,
        status: null,
        content: null,
        references: []
      }
    },
    entity: `${testOrigin}/api/community/topics/@{topic_id}`,
    collection: {
      url: `${testOrigin}/api/community/topics?filter=@{filter}&sorter=@{sorter}&limit=@{limit}&page=@{page}`,
      query: {
        filter: null,
        sorter: null
      }
    }
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
    buryingPoint: {
      hitTag: `${testOrigin}/api/user/burying-points/hit-tag?tag_id=@{tagId}&score=@{score}`,
    },
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
          date: null,
          motto: null,
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
            content: null,
            rate: null,
            status: null,
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
            content: null,
            rate: null,
            status: null,
            references: []
          }
        },
        entity: `${testOrigin}/api/user/community/reviews/@{review_id}`,
      },
      topic: {
        create: {
          url: `${testOrigin}/api/user/community/topics`,
          method: 'post',
          body: {
            title: null,
            content: {
              type: 'html',
              source: ''
            },
            status: null,
            references: []
          }
        },
        update: {
          url: `${testOrigin}/api/user/community/topics/@{topic_id}`,
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
            status: null,
            references: []
          }
        },
        entity: `${testOrigin}/api/user/community/topics/@{topic_id}`,
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
      collection: `${testOrigin}/api/user/book-notes?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
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
      shipment: {
        url: `${testOrigin}/api/user/orders/shipment`,
        body: {
          addressId: null,
          items: null
        }
      },
      orderring: {
        url: `${testOrigin}/api/user/orders/orderring`,
        body: {
          addressId: null,
          type: null,
          items: null
        }
      },
      logisticsInformation: {
        url: `${testOrigin}/api/user/orders/@{order_number}/logistics-information`,
        method: 'get'
      },
      cancel: {
        url: `${testOrigin}/api/user/orders/@{order_number}/cancel?status=@{status}`,
        method: 'post',
        body: {}
      },
      evaluate: {
        url: `${testOrigin}/api/user/orders/@{order_number}/evaluate`,
        method: 'post',
        body: {
          rate: null,
          content: null,
        }
      },
      received: {
        url: `${testOrigin}/api/user/orders/@{order_number}/receive`,
        method: 'post',
        body: {}
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
        },
        bulkDelete: {
          url: `${testOrigin}/api/user/cart?ids=@{ids}`,
          method: 'delete',
          query: {
            ids: '',
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
      collection: `${testOrigin}/api/user/subscribes?filter=@{filter}&sorter=@{sorter}&page=@{page}&limit=@{limit}`,
      unsubscribe: {
        url: `${testOrigin}/api/user/subscribes/@{subscribe_id}/unsubscribe`,
        method: 'delete',
        query: {
          subscribe_id: null
        }
      }
    }
  },
  origin: {
    url: `${testOrigin}`
  },
  upload: {
    url: `${testOrigin}/api/reference-data/upload`,
    source: `${testOrigin}/api/reference-data/source`,
    avatar: `${testOrigin}/api/user/avatar`,
    cover: `${testOrigin}/api/books/cover`,
  },
  discover: {
    collection: `${testOrigin}/api/recommendation/discover`
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
    signUp: {
      url: `${testOrigin}/api/system/sign-up`,
      method: 'post',
      body: {
        accountType: null,
        userdata: null,
        password: null
      }
    },
    usernameExists: `${testOrigin}/api/system/username-exists?username=@{username}`,
    nicknameExists: `${testOrigin}/api/system/nickname-exists?nickname=@{nickname}`,
    realtime: `${testOrigin}/api/system/realtime`
  }
}

export default {};