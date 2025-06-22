import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPagosComponent } from './components/listar-pagos/listar-pagos.component';
import { AuthGuard } from '../../auth/auth.guard';
import { RoleGuard } from '../../auth/role.guard';

const routes: Routes = [
  {
    path:'listar-pagos',
    component: ListarPagosComponent,
     canActivate:[AuthGuard,RoleGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoRoutingModule { }
