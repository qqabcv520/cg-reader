import {Injectable} from "@angular/core";
import LocalStorageService from "./local-storage.service";
/**
 * Created by 米饭 on 2017-04-14.
 */


@Injectable()
export default class UserService {

  private _token: string | null;
  private _isRemember: boolean;

  constructor(private localStorageService: LocalStorageService) {
    this._isRemember = localStorageService.get<boolean>("isRemember") || false;
    if(this._isRemember) {
      this.token = localStorageService.get<string>("token");
    }
  }
  //
  // /**
  //  * 提交username和password，从服务端获取token
  //  * @param loginParam
  //  */
  // login(loginParam: ILoginParam) {
  //   this.userRest.customPOST(loginParam, "token").subscribe((result) => {
  //     this.token = result.token
  //   }, function (err) {
  //     console.error("登录失败:" + err.state);
  //   });
  // }

  get token(): string | null {
    return this._token;
  }

  set token(value: string | null) {
    this._token = value;
    // this.restangular.head({token: value});
    if(this._isRemember) {
      this.localStorageService.set<string>("token", value);
    }
  }

  get isRemember(): boolean {
    return this._isRemember;
  }

  set isRemember(value: boolean) {
    this._isRemember = value;
  }
}

