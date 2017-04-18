import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";
import {Restangular} from "ng2-restangular";

@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage implements OnInit {

    article = {};

    constructor(private navParams: NavParams,
                private restangular: Restangular) {
    }

    ngOnInit(): void {
        let id = this.navParams.get('id');
        this.restangular.one("articles", id).get()
            .subscribe((result) => {
                this.article = result;
            });
    }

}