import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {SettingsPage} from '../pages/settings/settings';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {RestangularModule} from 'ng2-restangular';
import LocalStorageService from "../providers/local-storage.service";
import {RestangularConfigFactory} from "../providers/REST";
import UserService from "../providers/user.service";
import {WelcomePage} from "../pages/welcome/welcome";
import {ContentPage} from "../pages/content/content";
import {ListDataProvider} from "../providers/list-data";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        RegisterPage,
        SettingsPage,
        WelcomePage,
        ContentPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '返回',
            mode: 'ios',
            // pageTransition: 'ios-transition',
            // menuType: "push"
        }),

        RestangularModule.forRoot([UserService], RestangularConfigFactory),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        LoginPage,
        RegisterPage,
        SettingsPage,
        WelcomePage,
        ContentPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserService,
        LocalStorageService,
        ListDataProvider
    ]
})
export class AppModule {
}

