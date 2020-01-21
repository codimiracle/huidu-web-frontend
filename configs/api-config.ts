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
export enum API {
  UserCollection = "user.collection",
  LoggedUserData = "user.logged",
  BookEntity = "book.entity"
}

const address = '192.168.1.150';
// const address = '192.168.43.195';

// var origin = window.location.origin;
var origin = `http://${address}:3000`;

/**
 * API definitions, it is url plus placeholder really.
 * 
 * plachholder starts with ':' and no end indication.
 */
export const APIDefinitionData : APIDefinitionSet = {
  book: {
    collection: {
      withCategory: `${origin}/api/books?category=:category_id`,
    },
    entity: `${origin}/api/books/:book_id`
  },
  user: {
    logged: `${origin}/api/system/logged-user/profile`,
  }
}

export default {};