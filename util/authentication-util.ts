import { User } from "../types/user";

export interface UserToken {
  expireTime: string;
  token: string;
  user: User;
}
export default class AuthenticationUtil {
  static save(token: UserToken) {
    if (typeof window == 'object') {
      window.localStorage.setItem('expired', token.expireTime);
      window.localStorage.setItem('token', token.token);
    }
  }
  static getToken() {
    if (typeof window == 'object') {
      return this.isValidated() && window.localStorage.getItem('token');
    }
  }
  static hasCredentials() {
    return window.localStorage.length > 0;
  }
  static isValidated() {
    if (typeof window == 'object') {
      let expired = window.localStorage.getItem('expired');
      let token = window.localStorage.getItem('token');
      let nowDate = new Date();
      let expiredDate = new Date(expired);
      return expired && token && (nowDate.getTime() < expiredDate.getTime());
    }
    return false;
  }
  static destroy() {
    if (typeof window == 'object') {
      window.localStorage.clear();
    }
  }
}