import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthSignInPage } from './auth-sign-in';

@NgModule({
  declarations: [
    AuthSignInPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthSignInPage),
  ],
})
export class AuthSignInPageModule {}
