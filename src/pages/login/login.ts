import {Component} from '@angular/core';
import UserService from "../../providers/user.service";
import {Restangular} from "ngx-restangular";
import {NavController, ToastController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    account: { username: string, password: string } = {
        username: "",
        password: ""
    };


    constructor(private navCtrl: NavController, private toastCtrl: ToastController, private restangular: Restangular, private user: UserService) {
    }

    doLogin() {
        this.restangular.all("users").customPOST(this.account, "token").subscribe((result) => {
                this.user.token = result.token;
                this.user.username = this.account.username;
                this.navCtrl.setRoot(HomePage);
                this.showToast("登录成功");
            }, (error: Response) => {
                switch (error.status) {
                    case 401:
                        this.showToast("密码错误");
                        break;
                    case 403:
                        this.showToast("用户不存在");
                        break;
                    default:
                        this.showToast("登录失败：" + error.statusText);
                        break;
                }
            }
        );
    }

    private showToast(str: string) {
        let toast = this.toastCtrl.create({
            message: str,
            duration: 2000,
            position: "top"
        });
        toast.present();
    }

    openRegister() {
        this.navCtrl.push(RegisterPage);
    }

}
