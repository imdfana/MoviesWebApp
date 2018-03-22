import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesEditPage } from './movies-edit';

@NgModule({
  declarations: [
    MoviesEditPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesEditPage),
  ],
})
export class MoviesEditPageModule {}
