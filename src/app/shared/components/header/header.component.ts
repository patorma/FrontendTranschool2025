import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  public title:string = 'Sistema de Administración de Transporte Escolar';
  constructor(public authService:AuthService,private router: Router){}

  ngOnInit(): void {
  }

  logout(): void {
    let email = this.authService.usuario.email
    this.authService.logout();
    Swal.fire('Logout',`Hola ${email}, has cerrado sesión con éxito!`,'success');
    this.router.navigate(['/login']);
  }
}
