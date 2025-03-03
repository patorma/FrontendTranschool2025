import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./component/welcome/welcome.component";
import { AuthGuard } from "../auth/auth.guard";




const routes: Routes =[
  {
    path:'',
    component: WelcomeComponent,
     canActivate:[AuthGuard]
   }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],

})
export class UserRoutingModule{}
