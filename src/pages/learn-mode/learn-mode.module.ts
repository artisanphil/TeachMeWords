import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearnModePage } from './learn-mode';

@NgModule({
  declarations: [
    LearnModePage,
  ],
  imports: [
    IonicPageModule.forChild(LearnModePage),
  ],
})
export class LearnModePageModule {}
