import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";
import Swal from "sweetalert2";
import { User } from '../shared/interface/user';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  user!: User;
  constructor(private authService: AuthService,private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    console.log(this.authService.isAuthenticated());
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }

    let role = route.data['role'] as string;
    console.log("Rol requerido:", role);
    console.log("Rol del usuario:", this.authService.user.role);
    if(this.authService.hasRole(role)){

      return true;
    }
      this.getUsuario();

      this.router.navigate(['/usuarios']);
      return false;
  }

  public getUsuario(): void{
    this.authService.getUser().subscribe(response => {
      const {data} = response
      console.log('Usuario recibido desde API:', data);

      // Asegurarse de acceder correctamente a los datos
      if (data) {
        this.user = data;
        const {name,last_name,role} = data
        Swal.fire('Acceso denegado',`Hola, ${name} ${last_name} de rol ${role}  no tienes acceso a este recurso!`,'warning');
      }
    });
  }

}
