import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagoModule } from './pages/pago/pago.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
    {
    path:'home',
    loadChildren: () =>import('./shared/shared.module').then(m =>m.SharedModule),
  },

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m =>m.AuthModule)

  },


  {
    path: 'usuarios',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path:'pagos',
    loadChildren:() => import('./pages/pago/pago.module').then(m => m.PagoModule)
  }
  ,
  // {
  //     path:''
  // },
  // {
  //   path:'usuarios'
  // },

  {
    path:'**',
   component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
