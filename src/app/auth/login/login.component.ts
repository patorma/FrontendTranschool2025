import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../user/interface/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html'
})
export class LoginComponent {

  errors: string[] = [];
  titulo: string = 'Iniciar Sesión'
  usuario:  User = {
    id: 0,
        name: '',
        last_name: '',
        comuna: '',
        role: 'apoderado', // Asigna un valor válido para el tipo `roles`
        telefono: '',
        email: '',
        password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const {email,password} = this.usuario
    if(email == null || password == null || email === '' || password== ''){
      Swal.fire('Error Login','Username o password vacías!','error');
      return;
    }
    this.authService.login(this.usuario).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);

        // Obtener datos del usuario desde API /me
        this.authService.getUserData().subscribe((user) => {
          this.authService.setUser(user);
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso'
          });
          this.router.navigate(['/welcome']);
        });
      },
      error: (err:any) => {

        this.errors = err.message as string[]; // Laravel devuelve error.error

        console.log(this.errors)
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text:  this.errors.toString()||'Credenciales incorrectas. Por favor, inténtelo de nuevo.'
        });
      }
    });
  }
}
