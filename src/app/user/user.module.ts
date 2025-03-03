import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports:[
    WelcomeComponent
  ]
})
export class UserModule { }
