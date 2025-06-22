import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { Pago } from '../interface/pago';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagosService {

   private URL=  `${URL_SERVICIOS}`;

   public pago: Pago ={
      id:    0,
      monto:   0,
      fecha_vencimiento: '',
      estado:    '',
      fecha_pago:  '',
      multa:       0,
      total:       0,
      usuario:   {
        id: 0,
        name: '',
        last_name: '',
        comuna: '',
        role: '' ,// Asigna un valor válido para el tipo `roles`
        telefono: '',
        email: '',
      }
   }

  constructor(private http: HttpClient,private router: Router) { }

  getPagos(page:number):Observable<any>{
    return this.http.get(`${this.URL}/pagos?page=${page}`)
  }
}
