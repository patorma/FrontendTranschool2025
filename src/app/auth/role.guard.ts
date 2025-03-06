import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";
import Swal from "sweetalert2";



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
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

    Swal.fire('Acceso denegado',`Hola, ${this.authService.user.name}
      ${this.authService.user.last_name} no tienes acceso a este recurso!`,'warning');
      this.router.navigate(['/usuarios']);
      return false;
  }

}
