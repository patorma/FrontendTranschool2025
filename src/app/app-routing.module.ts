import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  // {
  //   path:'usuarios'
  // },

  {
    path:'**',
    redirectTo: '/usuarios'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
