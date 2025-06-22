import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserRoutingModule } from './user-routing.module';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    WelcomeComponent,
    ListarUsuariosComponent,
    FormUserComponent,
    CrearUsuarioComponent,


  ],
  imports: [
    CommonModule,
    UserRoutingModule,
     FormsModule,
     SharedModule
  ],
  exports:[
    WelcomeComponent,

  ]
})
export class UserModule { }
