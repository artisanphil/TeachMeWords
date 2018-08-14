import { Component, ElementRef, Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Zip } from '@ionic-native/zip';
import { TranslateService } from '@ngx-translate/core';

//import { getComponent } from '@angular/core/src/linker/component_factory_resolver';
declare var window;
declare var ankiBinaryToTable: any;
let loading;

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

  arrFiles: any;

  constructor(public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, private transfer: FileTransfer, private file: File, private zip: Zip, private elRef: ElementRef, renderer: Renderer2, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportPage');
    
    loading = this.loadingCtrl.create({
      content: this.translate.instant('PleaseWait')
    });
  
    loading.present();

    document.getElementById("importMessage").innerHTML = this.translate.instant('availableAPKG');
    this.displayImport();
  }  

  ngAfterViewInit() {
  }
  
  displayImport() {
    console.log("displayImport");
    /**
     * Starter vars.
     */
    var fileStr = "";
    var found = 0;
    var index = 0;
    var i;
    var el = this.elRef;

    this.arrFiles = [];
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

    function loopThroughDirectories(localURLs, callback) {
      for (i = 0; i < localURLs.length; i++) {

        console.log("directory: " + localURLs[i]);
        if(i == (localURLs.length - 1))
        {
          loading.dismiss();
          callback();
        }
        if (localURLs[i] === null || localURLs[i].length === 0) {
          continue; // skip blank / non-existent paths for this platform
        }
        window.resolveLocalFileSystemURL(localURLs[i], addFileEntry, addError);
      }
    }
    /**
     * Recursive function for file entry.
     */
    var that = this;
    var addFileEntry = function (entry) {
      console.log("addFileEntry");
      var dirReader = entry.createReader();
      dirReader.readEntries(
        function (entries) {
          console.log("nr of entries: " + entries.length);
          var i;
          for (i = 0; i < entries.length; i++) {
            console.log(entries[i].fullPath);
            if (entries[i].isDirectory === true) {
              // Recursive -- call back into this subdirectory
              addFileEntry(entries[i]);
            } else {
              if(entries[i].fullPath.endsWith(".apkg") && entries[i].fullPath.search("/AnkiDroid/") == -1)
              {
                console.log(i + ": " + entries[i].fullPath);
                that.arrFiles.push({nr: i, fullPath: entries[i].fullPath, nativeURL: entries[i].nativeURL}); 
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

    loopThroughDirectories(localURLs, function(){
    });
    
    //return addFileEntry;
  }  

  openfile(clickedButton)
  {
    var i = clickedButton.currentTarget.id;
    var listFiles = document.getElementById("listFiles");
    listFiles.style.display = 'none';

    var myfile = (<HTMLInputElement>document.getElementById('filenr' + i)).value
    var that = this;
    console.log(myfile);
    localStorage.clear();
    document.getElementById("importMessage").innerHTML = this.translate.instant('Importing');
    
    ankiBinaryToTable(myfile, function() {
      //console.log(wordlist);
      console.log("push to homepage");
      //that.navCtrl.push(HomePage);
      that.navCtrl.setRoot('HomePage');
    });
    
  }    
}
