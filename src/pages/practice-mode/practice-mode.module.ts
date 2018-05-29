import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PracticeModePage } from './practice-mode';

@NgModule({
  declarations: [
    PracticeModePage,
  ],
  imports: [
    IonicPageModule.forChild(PracticeModePage),
  ],
})
export class PracticeModePageModule {}
