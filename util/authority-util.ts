import { User } from "../types/user";
import { Authority } from "../configs/backend-config";

export default class AuthorityUtil {
  static getAuthorities(user: User): string[] {
    let role = user && user.role;
    let authorities = role && role.authorities || [];
    return authorities;
  }
  static checkAuthority(user: User, authority: Authority) {
    let authorities = this.getAuthorities(user);
    return authorities.includes(authority);
  }
}