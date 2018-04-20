import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseModePage } from './choose-mode';

@NgModule({
  declarations: [
    ChooseModePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseModePage),
  ],
})
export class ChooseModePageModule {}
