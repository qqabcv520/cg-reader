/**
 * Created by 米饭 on 2017-04-15.
 */

import UserService from "./user.service";
import Md5 from "./md5";


// 设置Restangular默认设置
export function RestangularConfigFactory(RestangularProvider, userService: UserService) {

    RestangularProvider.setBaseUrl('http://mifan.lol/blog');

    // by each request to the server receive a token and update headers with it
    RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
        let newHeader;
        if(userService.username != null) {
            newHeader = {
                username: userService.username,
                curTimeStr: Date.now(),
                nonce: Math.floor(Math.random() * 10000),
                checkSum: ""
            };

            newHeader.checkSum = new Md5()
                .hex_md5(userService.token + newHeader.username + newHeader.curTimeStr + newHeader.nonce);
        }

        return {
            headers: Object.assign({}, headers, newHeader)
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
