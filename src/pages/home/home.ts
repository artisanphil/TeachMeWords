import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';

declare var BoxOfQuestions: any;
declare var LWdb: any;

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private file: File) {

  }

  navigateToChooseMode() : void {
    this.navCtrl.push('ChooseModePage', {
      message: "Hello from the HomePage!"
    });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
    this.displayLessons();
  }  

  displayLessons() {
    var lw = BoxOfQuestions(LWdb('lw-storage'));

    var tag = "Nomen";
    //var wordsFilteredByTag = lw.allWordsFilteredByTag(tag);
    var wordlist = lw.db.allWords(); //lw.getLearnCards(tag);

    console.log("wordlist:");
    console.log(wordlist);
    var arrLesson = [];
    var categories = document.getElementById("categories");
    if(wordlist.length > 0) {
      
      var reviewButton = document.getElementById("reviewButton");
      reviewButton.style.display = "inline";
      
      for(var i=0;i<wordlist.length;i++) {
        var lesson = wordlist[i].tags.split(",")[0];
        if(arrLesson.indexOf(lesson) === -1) {
          arrLesson.push(lesson);
          //var catButton = "<div class=category>";
          if(wordlist[i].translateIsImage) {
            var lessonContentSample = "<img src='" + this.file.dataDirectory + "media/" + wordlist[i].translate +"'>";
          }
          else {
            var lessonContentSample = "<span class=answerText>" + wordlist[i].translate + "</span>";
          }
          var catButton = ""; //"<a href=\"choose-mode.html?tag=" + lesson + "\" style=\"underline: none;\">";
          catButton += "<figure class=category (click)=\"navigateToChooseMode()\"><div>" + lessonContentSample + "</div>";
          catButton += "<figcaption>" + lesson + "</figcaption>";
          catButton += "</figure>";
          catButton += "</a>";
          categories.innerHTML += catButton;
        }
      }
    }
   
    lw.db.loadWords(wordlist);
    
  }
}
