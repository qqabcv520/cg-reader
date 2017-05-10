import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {SettingsPage} from '../pages/settings/settings';
import UserService from "../providers/user.service";
import {LoginPage} from "../pages/login/login";
import {UserInfoPage} from "../pages/user-info/user-info";
import {TypePage} from "../pages/type/type";
import {CollectionPage} from "../pages/collection/collection";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any, params?: any }>;

    constructor(private platform: Platform,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private userService: UserService) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: '首页', component: HomePage},
            {title: '电影日报', component: TypePage, params: {name:"电影日报", id: 14} },
            {title: '设计日报', component: TypePage, params: {name:"设计日报", id: 19} },
            {title: '游戏日报', component: TypePage, params: {name:"游戏日报", id: 16} },
            {title: '动漫日报', component: TypePage, params: {name:"动漫日报", id: 17} },
            {title: '互联网日报', component: TypePage, params: {name:"互联网日报", id: 18} }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.statusBar.styleDefault();
            // this.splashScreen.hide();
            // this.statusBar.show();
            this.statusBar.styleBlackTranslucent();
        });


    }

    openPage(page) {
        // if(page.params) {
        //     this.nav.setRoot(page.component, page.params, { animate: true});
        // } else {
        //     this.nav.setRoot(page.component, page.params);
        // }
        this.nav.setRoot(page.component, page.params);
    }

    openSettingPage() {
        this.nav.push(SettingsPage);
    }

    openCollectionPage(){
        this.nav.push(CollectionPage);
    }

    isLogined(){

    }

    openUserInfo(){
        if(this.userService.token) {
            this.nav.push(UserInfoPage);
        } else {
            this.nav.push(LoginPage);
        }
    }
}
