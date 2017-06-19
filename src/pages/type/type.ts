import { Component } from '@angular/core';
import {MenuController, NavController, NavParams, Refresher} from 'ionic-angular';
import {Restangular} from "ngx-restangular";
import {IArticle, ListDataProvider, ListDataService} from "../../providers/list-data";
import {ContentPage} from "../content/content";

/**
 * Generated class for the Type page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-type',
    templateUrl: 'type.html',
})
export class TypePage {


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


    typeName: string;

    constructor(private navParams: NavParams,
                private navCtrl: NavController,
                private listDataProvider: ListDataProvider,
                private menuCtrl: MenuController,
                private restangular: Restangular) {

        this.typeName = navParams.get("name");

        let rest = restangular.one("tags", navParams.get("id")).all("articles");
        this.listDataService = listDataProvider.create(navParams.get("name"), rest);


    }

    ionViewDidLoad() {
        this.listDataService.update().subscribe({
            complete: () => {
                this.articles = this.listDataService.articles;
            }
        });
    }


    ionViewDidEnter() {
        this.menuCtrl.swipeEnable(true);
    }

    ionViewDidLeave() {
        this.menuCtrl.swipeEnable(false);
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


    get isOver() {
        return this.listDataService.isOver;
    }
}
