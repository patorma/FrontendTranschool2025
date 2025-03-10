import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { UserRoutingModule } from './user-routing.module';
import { ListarUsuariosComponent } from './component/listar-usuarios/listar-usuarios.component';
import { PaginadorComponent } from './component/paginador/paginador.component';
import { FormUserComponent } from './component/form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './component/crear-usuario/crear-usuario.component';



@NgModule({
  declarations: [
    WelcomeComponent,
    ListarUsuariosComponent,
    PaginadorComponent,
    FormUserComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
     FormsModule,
  ],
  exports:[
    WelcomeComponent,
    PaginadorComponent
  ]
})
export class UserModule { }
