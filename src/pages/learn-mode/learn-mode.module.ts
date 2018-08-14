import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearnModePage } from './learn-mode';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LearnModePage,
  ],
  imports: [
    IonicPageModule.forChild(LearnModePage),
    TranslateModule.forChild()
  ],
})
export class LearnModePageModule {}
