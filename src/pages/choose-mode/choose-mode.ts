import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChooseModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-mode',
  templateUrl: 'choose-mode.html',
})
export class ChooseModePage {

  lesson: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseModePage');
    console.log(this.navParams.get('lesson'));
    this.lesson = this.navParams.get('lesson');
  }

  navigateToLearnMode(lesson) : void {
    this.navCtrl.push('LearnModePage', {
      tag: lesson
    });
  }  

  navigateToPracticeMode(lesson) : void {
    this.navCtrl.push('PracticeModePage', {
      tag: lesson,
      mode: "practice"
    });
  }    

}
