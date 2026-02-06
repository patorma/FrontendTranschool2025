import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { AuthGuard } from "../auth/auth.guard";
import { ListarUsuariosComponent } from "./components/listar-usuarios/listar-usuarios.component";
import { FormUserComponent } from "./components/form-user/form-user.component";
import { roles } from '../shared/interface/user';
import { RoleGuard } from "../auth/role.guard";
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";




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
    canActivate:[AuthGuard,RoleGuard],
    data: {role: 'admin'}
  },
  {
    path: 'formuser/:id',
    component: FormUserComponent,
    canActivate:[AuthGuard,RoleGuard],
    data:{role:'admin'}
  },
  {
    path:'welcome',
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
