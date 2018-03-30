import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportPage } from './import';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ImportPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportPage),
    ComponentsModule
  ],
})
export class ImportPageModule {}
