import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from '../user/component/welcome/welcome.component';
import { AuthGuard } from './auth.guard';



const routes: Routes =[
   {
    path: '',
    component:LoginComponent,

   },

]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class AuthRoutingModule{}
