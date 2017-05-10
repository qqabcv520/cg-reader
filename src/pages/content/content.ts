import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {Restangular} from "ng2-restangular";
import {IArticle} from "../../providers/list-data";
import LocalStorageService from "../../providers/local-storage.service";

@Component({
    selector: 'page-content',
    templateUrl: 'content.html'
})
export class ContentPage implements OnInit {

    article: IArticle;

    constructor(private navParams: NavParams,
                private restangular: Restangular,
                private localStorageService: LocalStorageService) {

    }

    ngOnInit(): void {
        this.article = this.navParams.get('article');

        if(this.article.content != null) {
            return;
        }

        this.restangular.one("articles", this.article.id).get()
            .subscribe((result) => {
                this.article.content = result.content;
            });
    }

    saveArticleData(){
        
    }

}