import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoRoutingModule } from './pago-routing.module';
import { ListarPagosComponent } from './components/listar-pagos/listar-pagos.component';


@NgModule({
  declarations: [

  
    ListarPagosComponent
  ],
  imports: [
    CommonModule,
    PagoRoutingModule
  ]
})
export class PagoModule { }
