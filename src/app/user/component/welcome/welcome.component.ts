import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interface/user';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  user!: User;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(response => {
      const {data} = response
      console.log('Usuario recibido desde API:', data);

      // Asegurarse de acceder correctamente a los datos
      if (data) {
        this.user = data;
      }
    });

  }

  logout(): void {
    this.authService.logout();
  }
}
