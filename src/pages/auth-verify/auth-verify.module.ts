import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthVerifyPage } from './auth-verify';

@NgModule({
  declarations: [
    AuthVerifyPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthVerifyPage),
  ],
})
export class AuthVerifyPageModule {}
