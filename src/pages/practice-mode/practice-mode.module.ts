import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticeModePage } from './practice-mode';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PracticeModePage,
  ],
  imports: [
    IonicPageModule.forChild(PracticeModePage),
    TranslateModule.forChild()
  ],
})
export class PracticeModePageModule {}
