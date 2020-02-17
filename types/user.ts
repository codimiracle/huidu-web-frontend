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
  roles: ["user"],
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