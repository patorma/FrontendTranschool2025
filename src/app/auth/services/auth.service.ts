import { Injectable } from '@angular/core';

import { roles, User } from '../../shared/interface/user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { Login } from '../../shared/interface/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL=  `${URL_SERVICIOS}`;
  private token!: any ;
  private _token!: string;
  public user: User = {
    id: 0,
        name: '',
        last_name: '',
        comuna: '',
        role: 'apoderado' ,// Asigna un valor válido para el tipo `roles`
        telefono: '',
        email: '',
        password: ''
  };


  constructor(private http: HttpClient,private router: Router) {
    const storedRole = localStorage.getItem('role');
    if (storedRole && this.isValidRole(storedRole)) {
      this.user.role = storedRole;
  }
   }
   isValidRole(role: string): role is roles {
    return role === 'admin' || role === 'apoderado' || role === 'transportista';
}
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

 updateUser(user: User): Observable<User>{
     return this.http
                  .put<User>(`${this.URL}/user/${user.id}`,user)
                  .pipe(
                    catchError((e)=>{
                      if(e.error.mensaje){
                        console.error(e.error.mensaje);
                        }
                      return throwError(()=>e);
                    })
                  )
 }
  login(user:Login):Observable<any>{
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

  // logout2(token:any):Observable<any>{
  //   return this.http.post<any>(`${this.URL}/logout`,token)
  // }

  getUserById(id: number): Observable<User>{
    return this.http
                  .get<User>(`${this.URL}/userId/${id}`)
                  .pipe(
                    catchError((e) => {
                      if(e.status != 401 && e.error.mensaje){
                          /*capturamos el error y redirigimos a gastos*/
                       this.router.navigate(['/usuarios'])
                        console.error(e.error.mensaje);
                      }
                      return throwError(()=>e);
                    })
                  )
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
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
     map((response:any)=>{
      console.log("Respuesta del backend:", response);
      const {data} = response
      this.user = data; // Asigna toda la respuesta a this.user
     if(this.user.role){
      localStorage.setItem('role',this.user.role);
     }

      console.log("Rol del usuario después de la respuesta:", this.user.role);
      return response;
     })
      ,
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
    return this.user.role === role;
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

  getUsers(page: number):Observable<any>{
    return this.http.get(`${this.URL}/users?page=${page}`).pipe(
      catchError((e) => {
        if(e.status != 401 && e.error.message){
          console.log('desde getusers')
            /*capturamos el error y redirigimos a gastos*/
         this.router.navigate(['/login'])
          console.error(e.error.error);
          console.error(e.error.message);
        }
        return throwError(()=>e);
      })
    )
  }

  public removeToken(): void{
    localStorage.removeItem('token');
  }

  deleteUser(id: number): Observable<User>{
    return this.http
                .delete<User>(`${this.URL}/user/${id}`)
                .pipe(
                  catchError((e)=>{
                    if(e.error.mensaje){
                      console.error(e.error.mensaje);
                      }
                    return throwError(()=>e);
                  })
                )
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
