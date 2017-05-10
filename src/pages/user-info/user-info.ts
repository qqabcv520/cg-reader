import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import UserService from "../../providers/user.service";

/**
 * Generated class for the UserInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-user-info',
    templateUrl: 'user-info.html',
})
export class UserInfoPage {

    constructor(private navCtrl: NavController, private user: UserService) {
    }

    logout() {
        this.user.token = null;
        this.user.username = null;
        this.navCtrl.pop();
    }

}
