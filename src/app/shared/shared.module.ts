import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedRoutingModule } from './shared-routing.module';
import { PaginadorComponent } from './paginador/paginador.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';




@NgModule({
  declarations: [
    HeaderComponent,
   HomeComponent,
   PaginadorComponent,
   FooterComponent,
   NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    HeaderComponent,
    HomeComponent,
    PaginadorComponent,
    FooterComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
