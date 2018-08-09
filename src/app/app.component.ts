import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

declare var BoxOfQuestions: any;
declare var LWdb: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, icon: string, page: string, mode: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private translate: TranslateService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', page: 'HomePage', mode: "" },
      { title: 'Import', icon: 'download', page: 'ImportPage', mode: "" },
      { title: 'Review', icon: 'time', page: 'PracticeModePage', mode: "review"  }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.setDefaultLang('en');
      //this.translate.use('zh');              

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.dataIsImported()) {
        this.nav.setRoot('HomePage');
      } else {
        this.nav.setRoot('ImportPage');
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
    //this.nav.setRoot(page.component);

    this.nav.push(page.page, {
      mode: page.mode
    });    
  }
}
