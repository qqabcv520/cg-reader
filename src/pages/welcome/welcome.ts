import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
/**
 * Created by 米饭 on 2017-04-17.
 */

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {


    constructor(private navCtrl: NavController) {
        setTimeout(() => {
            navCtrl.setRoot(HomePage, null, {animate: true, direction: "forward"});
        }, 2000);
    }

}
