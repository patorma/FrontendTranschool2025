import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./component/welcome/welcome.component";
import { AuthGuard } from "../auth/auth.guard";
import { ListarUsuariosComponent } from "./component/listar-usuarios/listar-usuarios.component";
import { FormUserComponent } from "./component/form-user/form-user.component";
import { roles } from './interface/user';
import { RoleGuard } from "../auth/role.guard";




const routes: Routes =[

  {
    path:'listar-usuarios',
    component: ListarUsuariosComponent,
    canActivate:[AuthGuard,RoleGuard],
    data: {role: 'admin'}
  },
  {
    path: 'formuser',
    component:FormUserComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'formuser/:id',
    component: FormUserComponent
  },
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
