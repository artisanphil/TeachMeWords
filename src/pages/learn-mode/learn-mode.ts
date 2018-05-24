import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var BoxOfQuestions: any;
declare var LWdb: any;
declare var LWutils: any;
var lw = BoxOfQuestions(LWdb('lw-storage'));
var wordNumber = 1;

/**
 * Generated class for the LearnModePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-learn-mode',
  templateUrl: 'learn-mode.html',
})
export class LearnModePage {

  arrWords: any;
  lessonName: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LearnModePage');
    var tag = this.navParams.get('tag');
    console.log("lesson: " + tag);
    this.lessonName = tag;
    //lw = BoxOfQuestions(LWdb('lw-storage'));
    this.showRepeat(tag);
  }

  listen(clickedOption) : void
  {
    var wordID = clickedOption.currentTarget.id;
    var clickedWord = lw.getWord(wordID);
    
    var mediaPath = LWutils.getMediaPath(clickedWord.importedFromAPKG);
    
    //doesn't work with ionic live-reload https://github.com/ionic-team/ionic-cli/issues/287
    LWutils.playAudio(mediaPath + clickedWord.word);
    
  }

  back(lesson) :  void {

    if(wordNumber > 1){
      wordNumber = wordNumber - 4;
      this.showRepeat(lesson);
    }
    else {
      window.location.href = "choose-mode.html?tag=" + lesson;
    }
  }  
  forward(lesson) : void {

    if(wordNumber < lw.db.numberOfWords())
    {
      wordNumber = wordNumber + 4;
      this.showRepeat(lesson);
    }
  }

  showRepeat(tag)
  {
    //var tag = LWutils.getParameterByName("tag", window.location);

    var wordsFilteredByTag = lw.allWordsFilteredByTag(tag);

    var arrOptionButtons = document.getElementsByClassName("optionBtn");
    var arrOptions = lw.getLearnCards(tag);
    this.arrWords = [];

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
    console.log("showRepeat: " + numberOfOptions);
    for (var i = 0; i < numberOfOptions; i++) {
      var w = wordNumber + i - 1;
      var questionObj = lw.getWord(w);
      if(questionObj != null)
      {
          var mediaPath = LWutils.getMediaPath(questionObj.importedFromAPKG);

            ////arrOptionButtons[i].style.visibility = "visible";
            if(questionObj.translateIsImage) {
              var card = "<img class=imgAnswer src='" + mediaPath + questionObj.translate +"'>";
            }
            else {
              var card = "<span class=answerText>" + questionObj.translate + "</span>";
            }

            console.log("i: " + i + ":" + questionObj.translate);
            //arrOptionButtons[i].innerHTML = card; //'<img class=imgAnswer src="' + mediaPath + questionObj.translate + '">';
            //arrOptionButtons[i].id = w.toString(); 
            //this.arrWords[i] = w;
            this.arrWords.push({id: w.toString(), content: card}); 
      }
      else {
        ////arrOptionButtons[i].style.visibility = "hidden";
      }
    }
  var nextButton = document.getElementById("forward");

  if((wordNumber + 4) > arrOptions.length)
  {
    nextButton.style.visibility = 'hidden';
  }
  else {
    nextButton.style.visibility = 'visible';
  }

}  

}
