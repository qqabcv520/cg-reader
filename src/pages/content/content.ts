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
    collections: Array<IArticle>;
    localStorageService: LocalStorageService;

    constructor(private navParams: NavParams,
                private restangular: Restangular) {
        
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

    saveCollection(){
        
        this.collections.push(this.article);
        this.localStorageService.set<Array<IArticle>>("collections",this.collections);
        // if (this.localStorageService.get<Array<IArticle>>("collections") == null){
        //     this.collections.push(this.article);
        // }else{
        //     this.collections.push(this.article);
        // }
    }

}