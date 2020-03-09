import { User, SocialUser } from "../../../types/user"
import { Role } from "../../../types/role";
import { getMockRole } from "./role";

export const getMockSocialUser = (id?: number): SocialUser => {
  id = id || Math.random() * 100000;
  let username = new Buffer(`${id}`, 'utf-8').toString('base64');
  return {
    id: `${id}`,
    username: username,
    nickname: 'n-' + username,
    avatar: '/assets/avatar.png',
  }
}

export const getMockUser = (id?: number, role?: Role): User => {
  role = role || getMockRole(0, '用户');
  return {
    ...getMockSocialUser(id),
    role: role,
    extra: {
      gender: 'boy',
      age: 11,
      slogan: 'Hello world?',
      introduction: 'i am a user',
      birthdate: '2019-10-20',
      phone: '15800000000',
      email: '123@qq.com',
      region: '广东省 广州市 从化区'
    },
  }
}
