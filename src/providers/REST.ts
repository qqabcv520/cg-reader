/**
 * Created by 米饭 on 2017-04-15.
 */

import UserService from "./user.service";


// 设置Restangular默认设置
export function RestangularConfigFactory(RestangularProvider, UserService: UserService) {

  RestangularProvider.setBaseUrl('http://192.168.1.130:8080/myblog');

  // by each request to the server receive a token and update headers with it
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    return {
      headers: Object.assign({}, headers, {token: UserService.token})
    };
  });
}



//
// export const USER_REST = new OpaqueToken('UserRest');
// export function UserRestFactory(restangular: Restangular) {
//   return restangular.service('users');
// }
// export const ARTICLE_REST = new OpaqueToken('ArticleRest');
// export function ArticleRestFactory(restangular: Restangular) {
//   return restangular.service('articles');
// }
