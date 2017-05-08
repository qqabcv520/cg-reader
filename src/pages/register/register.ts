import {Component} from '@angular/core';
import {NavController, ToastController} from "ionic-angular";
import {Restangular} from "ng2-restangular";
import UserService from "../../providers/user.service";
import {HomePage} from "../home/home";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    account: { username: string, password: string } = {
        username: "",
        password: ""
    };

    constructor(private navCtrl: NavController, private toastCtrl: ToastController, private restangular: Restangular, private user: UserService) {
    }


    doRegister() {
        this.restangular.all("users").post(this.account).subscribe(
            () => {
                this.restangular.all("users").customPOST(this.account, "token").subscribe((result) => {
                        this.user.token = result.token;
                        this.user.username = this.account.username;
                        this.navCtrl.setRoot(HomePage);
                        this.showToast("注册完成");
                    }, (error: Response) => {
                        this.showToast("注册完成,登录异常：" + error.statusText);
                    }
                );
            }, (error: Response) => {
                this.showToast("注册失败：" + error.statusText);
            }
        );
    }

    showToast(str: string) {
        let toast = this.toastCtrl.create({
            message: str,
            duration: 2000,
            position: "top"
        });
        toast.present();
    }
}
