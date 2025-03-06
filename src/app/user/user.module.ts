import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { UserRoutingModule } from './user-routing.module';
import { ListarUsuariosComponent } from './component/listar-usuarios/listar-usuarios.component';
import { PaginadorComponent } from './component/paginador/paginador.component';
import { FormUserComponent } from './component/form-user/form-user.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    ListarUsuariosComponent,
    PaginadorComponent,
    FormUserComponent
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
