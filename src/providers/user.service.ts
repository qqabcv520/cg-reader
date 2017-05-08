import {Injectable} from "@angular/core";
import LocalStorageService from "./local-storage.service";
/**
 * Created by 米饭 on 2017-04-14.
 */


@Injectable()
export default class UserService {


    private _username: string;
    private _token: string;
    private _avatar: string;

    constructor(private localStorageService: LocalStorageService) {
        this._username = localStorageService.get<string>("username");
        this._token = localStorageService.get<string>("token");
        this._avatar = localStorageService.get<string>("avatar");
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
        this.localStorageService.set<string>("username", value);
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
        this.localStorageService.set<string>("token", value);
    }

    get avatar(): string {
        return this._avatar;
    }

    set avatar(value: string) {
        this._avatar = value;
        this.localStorageService.set<string>("avatar", value);
    }

}

