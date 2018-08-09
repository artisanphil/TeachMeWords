import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportPage } from './import';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ImportPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportPage),
    TranslateModule.forChild()
  ],
})
export class ImportPageModule {}
