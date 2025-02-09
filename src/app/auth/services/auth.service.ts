import { Injectable } from '@angular/core';

import { User } from '../../user/interface/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _user: User = {
    id: 0,
        name: '',
        last_name: '',
        comuna: '',
        role: 'apoderado', // Asigna un valor válido para el tipo `roles`
        telefono: '',
        email: '',
        password: ''
  };
  private _token!: string;
  private _refresh_token!: string ;

  constructor(private http: HttpClient) { }


  login(email:string, password:string){
    const URL=  `${URL_SERVICIOS}/login`;

  }
  // public get usuario(): User{
  //      if(this._user != null){
  //       return this._user;
  //      }else if(this._user === null && localStorage.getItem('user') !=null){
  //       this._user = JSON.parse(localStorage.getItem('user')!) as User;
  //       return this._user;
  //      }

  //      return this._user;
  // }

  // public get refreshToken(): string{
  //   if(this._refresh_token!= null){
  //     return this._refresh_token;
  //   } else if ( this._refresh_token  === null && localStorage.getItem('refresh_token') != null){
  //     this._refresh_token = localStorage.getItem('refresh_token')!;
  //     return this._refresh_token;
  //   }
  //   return null!;
  // }

  // public get token(): string{
  //   if(this._token  != null){
  //     return this._token;
  //   } else if ( this._token  === null && localStorage.getItem('token') != null){
  //     this._token= localStorage.getItem('token')|| '{}';
  //     return this._token;
  //   }
  //   return null!;
  // }

  // login(user: User): Observable<any>{

  // }
}
