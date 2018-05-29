import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var BoxOfQuestions: any;
declare var LWdb: any;
declare var LWutils: any;
var lw = BoxOfQuestions(LWdb('lw-storage'));
var wordNumber = 1;

/**
 * Generated class for the PracticeModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-practice-mode',
  templateUrl: 'practice-mode.html',
})
export class PracticeModePage {

  lessonName: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PracticeModePage');

    var tag = this.navParams.get('tag');
    this.lessonName = tag;

    this.showRepeat(tag);
  }

  showRepeat(tag) {

    var tag = LWutils.getParameterByName("tag", window.location);

    var wordsFilteredByTag = lw.allWordsFilteredByTag(tag);

    var arrOptionButtons = document.getElementsByClassName("optionBtn");
    var arrOptions = lw.getLearnCards(tag);

    //console.log(arrOptions);

    var numberOfOptions = 4;
    if(arrOptions.length < numberOfOptions)
    {
      if(wordNumber > 4) {
        numberOfOptions = arrOptions.length - (wordNumber + 4);
      }
      else {
        numberOfOptions = arrOptions.length;
      }
    }
    console.log(numberOfOptions);
    for (var i = 0; i < numberOfOptions; i++) {
      var w = wordNumber + i - 1;
      var questionObj = lw.getWord(w);
      if(questionObj != null)
      {
          var mediaPath = LWutils.getMediaPath(questionObj.importedFromAPKG);

            //arrOptionButtons[i].style.visibility = "visible";
            if(questionObj.translateIsImage) {
              var card = "<img class=imgAnswer src='" + mediaPath + questionObj.translate +"'>";
            }
            else {
              var card = "<span class=answerText>" + questionObj.translate + "</span>";
            }

            arrOptionButtons[i].innerHTML = card; //'<img class=imgAnswer src="' + mediaPath + questionObj.translate + '">';
            //arrOptionButtons[i].id = w; 
      }
      else {
        //arrOptionButtons[i].style.visibility = "hidden";
      }
    }

    /*
  var nextButton = document.getElementById("forward");

  if((wordNumber + 4) > arrOptions.length)
  {
    nextButton.style.visibility = 'hidden';
  }
  else {
    nextButton.style.visibility = 'visible';
  }
  */
}  

}
