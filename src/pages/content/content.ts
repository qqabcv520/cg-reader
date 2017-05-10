import {Component, OnInit} from '@angular/core';
import {NavParams, ToastController} from "ionic-angular";
import {Restangular} from "ng2-restangular";
import {IArticle, ICollection} from "../../providers/list-data";
import LocalStorageService from "../../providers/local-storage.service";

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})
export class ContentPage implements OnInit {

    article: IArticle;


    constructor(private navParams: NavParams,
                private restangular: Restangular,
                private localStorageService: LocalStorageService,
                private toastCtrl: ToastController) {

    }

    ngOnInit(): void {
        this.article = this.navParams.get('article');

        if (this.article.content != null) {
            return;
        }

        this.restangular.one("articles", this.article.id).get()
            .subscribe((result) => {
                this.article.content = result.content;
            });
    }

    saveCollection() {
        let collections = this.localStorageService.get<Array<ICollection>>("collections");
        if (collections == null) {
            collections = [];
        }
        if (this.isRepeat(collections)) {
            this.showToast("请勿重复收藏");
        } else {
            collections.push({
                id: this.article.id,
                title: this.article.title,
                titleImg: this.article.titleImg
            });
            this.localStorageService.set<Array<ICollection>>("collections", collections);
            this.showToast("收藏成功");
        }

    }

    private isRepeat(collections: Array<ICollection>): boolean {
        let repeat = false;
        for (let collection of collections) {
            if (collection.id == this.article.id) {
                repeat = true;
            }
        }
        return repeat;
    }

    private showToast(str: string) {
        let toast = this.toastCtrl.create({
            message: str,
            duration: 2000,
            position: "top"
        });
        toast.present();
    }


}