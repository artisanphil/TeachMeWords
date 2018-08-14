import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseModePage } from './choose-mode';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChooseModePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseModePage),
    TranslateModule.forChild()
  ],
})
export class ChooseModePageModule {}
