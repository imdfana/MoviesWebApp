import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesListPage } from './movies-list';

@NgModule({
  declarations: [
    MoviesListPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesListPage),
  ],
})
export class MoviesListPageModule {}
