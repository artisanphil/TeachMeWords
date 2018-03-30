import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { getComponent } from '@angular/core/src/linker/component_factory_resolver';
declare var window;
/**
 * Generated class for the ImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-import',
  templateUrl: 'import.html',
})
export class ImportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, private elRef: ElementRef, renderer: Renderer2) {
    renderer.listen(elRef.nativeElement, 'click', (event) => {
      this.openfile(event.srcElement.value);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
    this.displayImport();
  }  

  ngAfterViewInit() {
  }

  displayImport() {
    /**
     * Starter vars.
     */
    var fileStr = "";
    var found = 0;
    var index = 0;
    var i;
    var el = this.elRef;
    /**
     * Need cordova.file plugin.
     * $ cordova plugin add org.apache.cordova.file
     *
     * To get all urls see https://github.com/apache/cordova-plugin-file/blob/master/README.md#where-to-store-files
     *
     */

    var localURLs    = [
      this.file.cacheDirectory,
      this.file.applicationDirectory,
      this.file.applicationStorageDirectory,
      this.file.dataDirectory,
      this.file.documentsDirectory,
      this.file.externalApplicationStorageDirectory,
      this.file.externalCacheDirectory,
      this.file.externalRootDirectory,
      this.file.externalDataDirectory,
      this.file.sharedDirectory,
      this.file.syncedDataDirectory
    ];

    function loopThroughDirectories(localURLs) {
      for (i = 0; i < localURLs.length; i++) {
        if (localURLs[i] === null || localURLs[i].length === 0) {
          continue; // skip blank / non-existent paths for this platform
        }
        window.resolveLocalFileSystemURL(localURLs[i], addFileEntry, addError);
      }

    }
    /**
     * Recursive function for file entry.
     */
    var addFileEntry = function (entry) {

      var dirReader = entry.createReader();
      dirReader.readEntries(
        function (entries) {
          var i;
          for (i = 0; i < entries.length; i++) {
            if (entries[i].isDirectory === true) {
              // Recursive -- call back into this subdirectory
              addFileEntry(entries[i]);
            } else {
              if(entries[i].fullPath.endsWith(".apkg"))
              {
                //this.categories.push(entries[i].fullPath);
                
                //fileStr = entries[i].fullPath;
                var msg = "<li style=\"list-style-type:none; margin-top:5px\">";
                msg += "<textarea class=importFile type=\"input\" style=\"width:100%;\">" + entries[i].fullPath + "</textarea>";
                msg += "<input type=\"hidden\" id=filenr" + i + " value=\"" + entries[i].nativeURL + "\">";
                //msg += "<button myimport class=importButton (click)='openfile(" + i + ");'>Import</button>";
                msg += "<button myimport value=" + i + " class=importButton>Import</button>";
                msg += "</li>";
                var categories = document.getElementById("categories");
                categories.innerHTML += msg;
                //console.log(msg);
              }
            }
          }
        },
        function (error) {
          console.error("readEntries error: " + error.code);
        }
      );
    };

    /**
     * Directory error.
     */
    var addError = function (error) {
      console.error("getDirectory error: " + error.code);
    };

    /**
     * Loop through the array.
     */

    loopThroughDirectories(localURLs);
    
    //return addFileEntry;
  }  

  openfile(i)
  {
    var myfile = (<HTMLInputElement>document.getElementById('filenr' + i)).value
    console.log(myfile);
    /*
    var categories = document.getElementById("categories");
    categories.innerHTML = "";
    ankiBinaryToTable(myfile, function() {
      categories.innerHTML = "";
      console.log(wordlist);
      //displayLessons();
    });
    */
  }    
}
