import { Role } from "./role";

export interface UserInfo {
  gender: string,
  age: number,
  slogan: string,
  introduction: string,
  birthdate: string,
  phone: string,
  email: string,
  region: string
}
export interface SocialUser {
  id: string,
  username: string,
  nickname: string,
  avatar: string,
}
export interface User {
  id: string,
  username: string,
  nickname: string,
  avatar: string,
  role: Role,
  extra: UserInfo
}

export const UNKNOW_USER : User = {
  id: null,
  username: 'anonymous',
  avatar: '#unknow-avatar',
  nickname: 'unknow',
  role: {
    id: '342',
    name: '角色',
    authorities: []
  },
  extra: {
    gender: 'man',
    age: 16,
    slogan: 'hello world!',
    introduction: 'no data',
    email: '',
    phone: '',
    birthdate: '',
    region: ''
  }
}