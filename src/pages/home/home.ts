import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Content, NavController, Refresher, MenuController} from "ionic-angular";
import {ContentPage} from "../content/content";
import {IArticle, ListDataProvider, ListDataService} from "../../providers/list-data";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Restangular} from "ng2-restangular";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    /**
     * 获取界面Content的实例对象
     */
    @ViewChild(Content) content: Content;


    /**
     * 是否显示Toolbar
     * @type {boolean}
     */
    isTransparent = true;


    /**
     * 加载文章的服务
     */
    listDataService: ListDataService;

    /**
     * 加载的文章
     */
    articles: Array<IArticle>;

    private _slideArticles = [];

    constructor(private ref: ChangeDetectorRef,
                private navCtrl: NavController,
                private listDataProvider: ListDataProvider,
                private menuCtrl: MenuController,
                private splashScreen: SplashScreen,
                private restangular: Restangular) {

        this.listDataService = listDataProvider.create("home", restangular.all("articles"));

        this.listDataService.update().subscribe({
            complete: () => {
                this.articles = this.listDataService.articles;
                this._slideArticles = this.articles.slice(0, 5);
                this.splashScreen.hide();
            }
        });
    }

    ionViewCanEnter() {
        console.log("enter");
        this.menuCtrl.swipeEnable(true);
    }

    ionViewCanLeave() {
        console.log("leave");
        this.menuCtrl.swipeEnable(false);
    }

    onScroll($event: any) {
        let scrollTop = $event.scrollTop;
        this.isTransparent = scrollTop < 200;
        this.ref.detectChanges();
    }

    /**
     * 加载数据
     * @returns {Promise}
     */
    load(): Promise<null>{
        return new Promise((resolve) => {
            this.listDataService.load().subscribe({
                complete: () => resolve()
            });
        })
    }

    /**
     * 下拉刷新
     */
    update(refresher: Refresher) {
        // this.listDataService.update().subscribe();
        this.listDataService.update().subscribe({
            complete: () => {
                refresher.complete();
            }
        });
    }

    /**
     * 查看详情
     * @param article
     */
    openArticle(article: IArticle) {
        this.navCtrl.push(ContentPage, {article: article});
    }


    get slideArticles() {
        return this._slideArticles;
    }

    get isOver() {
        return this.listDataService.isOver;
    }


}

