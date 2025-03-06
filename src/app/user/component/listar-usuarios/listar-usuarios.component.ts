import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent implements OnInit {
   users: User[] = [];
   paginador: any;
   usuarioSeleccionado!: User
   title: string = 'Usuarios';
   titulo: string = 'Lista de Usuarios Registrados en el Sistema';
   boton: string = 'Registrar usuario';
   warning: string = 'No hay registros en la base de datos!';

   constructor( private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router){}

   ngOnInit(): void {
     this.authService.getUsers().subscribe((response)=>{
      const {data} = response;
      this.users  =   data as User[]
      console.log(this.users)
     })
   }

   delete(user: User): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
        .fire({
          title: 'Está seguro?',
          text: `¿Seguro que desea eliminar el usuario de nombre:  ${user.name} ${user.last_name}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, eliminar!',
          cancelButtonText: 'No, cancelar!',
          reverseButtons: true,
        })
        .then((result)=>{
          if(result.value){
            this.authService.deleteUser(user.id).subscribe({
              next: ()=>{
                this.users = this.users.filter((u)=> u !== user);
                this.router.navigate(['/usuarios/listar-usuarios']);
                swalWithBootstrapButtons.fire(
                  'Uusuario Eliminado!',
                  `Usuario de nombre ${user.name} ${user.last_name} eliminado con éxito.`,
                  'success'
                );
              },
              error: (err) =>{
                if (err.error.mensaje) {
                  // Muestra el mensaje de error usando Swal
                  swalWithBootstrapButtons.fire('Error', err.error.mensaje, 'error');
                } else {
                  // Si no hay mensaje de error personalizado, muestra un mensaje genérico
                  swalWithBootstrapButtons.fire('Error', 'Ha ocurrido un error al eliminar el usuario.', 'error');
                }
              }
            })
          }
        })

   }
}
