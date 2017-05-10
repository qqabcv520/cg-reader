import { Component } from '@angular/core';
import { ToastController } from "ionic-angular";

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    // Our local settings object
    constructor(private toastCtrl: ToastController) {

    }

    upDate() {
        this.showToast("无更新");
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
