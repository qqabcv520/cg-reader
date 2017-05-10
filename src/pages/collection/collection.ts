import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import LocalStorageService from "../../providers/local-storage.service";

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
  private title;

  constructor(private localStorageService: LocalStorageService) {

  }


}
