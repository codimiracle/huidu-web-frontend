import { Role } from "../../../types/role";
import { Authority } from "../../../configs/backend-config";

export const getMockRole = (id?: number, name?: '用户' | '作者' | '管理员'): Role => {
  name = name || '用户';
  let authorities = [];
  if (name == '用户') {
    authorities = [Authority.FrontendServices];
  }
  if (name == '作者') {
    authorities = [Authority.AuthorDataServices, Authority.AuthorAudioBooksService, Authority.AuthorElectronicsBooksService];
  }
  if (name == '管理员') {
    authorities = Object.values(Authority);
  }
  return {
    id: `${id}`,
    name: name,
    authorities: authorities
  }
}
