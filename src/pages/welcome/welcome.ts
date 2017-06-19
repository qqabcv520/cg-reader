import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {ListDataProvider} from "../../providers/list-data";
import {Restangular} from "ngx-restangular";
/**
 * Created by 米饭 on 2017-04-17.
 */

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {


    constructor(restangular: Restangular, navCtrl: NavController, listDataProvider: ListDataProvider) {
        let timeFlag = Date.now();

        listDataProvider.create("home", restangular.all("articles")).update().subscribe({
            complete: () => {
                let interval = Date.now() - timeFlag;
                if(interval < 2000) {
                    setTimeout(() => navCtrl.setRoot(HomePage, null, {animate: true, direction: "forward"}), 2000-interval);
                } else {
                    navCtrl.setRoot(HomePage, null, {animate: true, direction: "forward"});
                }
            }

        });

        // let timeout = setTimeout(() => navCtrl.setRoot(HomePage, null, {animate: true, direction: "forward"});
    }

}
