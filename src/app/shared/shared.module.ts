import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedRoutingModule } from './shared-routing.module';




@NgModule({
  declarations: [
    HeaderComponent,
   HomeComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    HeaderComponent,
    HomeComponent
  ]
})
export class SharedModule { }
