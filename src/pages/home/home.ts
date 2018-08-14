import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { TranslateService } from '@ngx-translate/core';

declare var BoxOfQuestions: any;
declare var LWdb: any;

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lessonButtons: any;

  constructor(public translate: TranslateService, public navCtrl: NavController, private file: File) {
    
  }

  navigateToChooseMode(tag) : void {
    this.navCtrl.push('ChooseModePage', {
      lesson: tag
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
    this.lessonButtons = [];
    var categories = document.getElementById("categories");
    if(wordlist.length > 0) {
            
      for(var i=0;i<wordlist.length;i++) {
        var lesson = wordlist[i].tags.split(",")[0];
        if(arrLesson.indexOf(lesson) === -1) {
          arrLesson.push(lesson)
          //var catButton = "<div class=category>";
          if(wordlist[i].translateIsImage) {
            var lessonContentSample = "<img src='" + this.file.dataDirectory + "media/" + wordlist[i].translate +"'>";
          }
          else {
            var lessonContentSample = "<span class=answerText>" + wordlist[i].translate + "</span>";
          }
          this.lessonButtons.push({lessonName: lesson, lessonContent: lessonContentSample}); 

        }
      }
    }
    
    lw.db.loadWords(wordlist);
    
  }
}
