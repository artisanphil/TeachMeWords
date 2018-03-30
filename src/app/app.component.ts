import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ImportPage } from '../pages/import/import';
import { ListPage } from '../pages/list/list';

declare var BoxOfQuestions: any;
declare var LWdb: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.dataIsImported()) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = ImportPage;
      }      
    });
  }

  dataIsImported() {
    var lw = BoxOfQuestions(LWdb('lw-storage'));
    var wordlist = lw.db.allWords(); 
    console.log("wordlist length: " + wordlist.length);
    if(wordlist.length > 0) {
      return true;
    }
    else
    {
      return false;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
