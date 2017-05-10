import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import LocalStorageService from "../../providers/local-storage.service";
import { ICollection } from "../../providers/list-data";
import { ContentPage } from "../content/content";

/**
 * Generated class for the Collection page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-collection',
    templateUrl: 'collection.html',
})
export class CollectionPage {
    collections : Array<ICollection>;
    
    constructor(private localStorageService: LocalStorageService,
                private navCtrl: NavController,) {
        this.collections = this.localStorageService.get<Array<ICollection>>("collections");
    }

    openArticle(collection: ICollection) {
        this.navCtrl.push(ContentPage, {article: collection});
    }

}
