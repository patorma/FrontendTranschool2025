import { Injectable } from '@angular/core';

import { User } from '../../user/interface/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL=  `${URL_SERVICIOS}`;
  private _token!: string;
  public user: User = {
    id: 0,
        name: '',
        last_name: '',
        comuna: '',
        role: 'apoderado', // Asigna un valor válido para el tipo `roles`
        telefono: '',
        email: '',
        password: ''
  };


  constructor(private http: HttpClient,private router: Router) { }

 registerUser(user: User): Observable<User>{
    return this.http
             .post(`${this.URL}/register`,user)
             .pipe(
              map((response: any) => response.user as User),
              catchError((e)=>{
                if (e.status === 400) {
                  return throwError(e);
                }
                if(e.error.message){
                  console.log(e.error.message)
                }
                return throwError(e);
              })
             )
 }
  login(user:User):Observable<any>{
    return this.http.post(`${this.URL}/login`, user).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error && error.error.error) {
      // Laravel devuelve los errores en el objeto `error`
      if (typeof error.error.error === 'object') {
        // Si es un objeto, extraemos los mensajes de validación
        errorMessage = Object.values(error.error.error).join('\n');
      } else {
        errorMessage = error.error.error; // Mensaje de error simple
      }
    } else if (error.status === 401) {
      errorMessage = 'Credenciales inválidas';
    } else if (error.status === 500) {
      errorMessage = 'Error en el servidor';
    }

    return throwError(() => new Error(errorMessage));
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.URL}/me`);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.URL}/me`).pipe(
      catchError((e) => {
        if(e.status != 401 && e.error.mensa){
            /*capturamos el error y redirigimos a gastos*/
         this.router.navigate(['login'])
          console.error(e.error.error);
        }
        return throwError(()=>e);
      })
    )
   }
   obtenerDatosToken(accessToken: string): any{
    if(!accessToken){
      return null
    }
    try {
      return JSON.parse(atob(accessToken.split(".")[1]));
    } catch (e) {
      return null;
    }
 }
 isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
  // let token = this.getToken();
  // if(!token){
  //   return false;
  // }
  // let payload = this.obtenerDatosToken(token);
  // return payload != null && payload.email && payload.email.length > 0;
}
   hasRole(role: string): boolean{
    if(this.user.role.includes(role)){
      return true
    }
    return false
   }
   public get usuario(): User{
    if (this.user.id !== 0) {
      return this.user;
    } else if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem('user')!);
      return this.user;
    }
    return {
      id: 0,
      name: '',
      last_name: '',
      comuna: '',
      role: 'apoderado',
      telefono: '',
      email: '',
      password: ''
    };

  }
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
