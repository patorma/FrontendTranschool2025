import { Component, OnInit } from '@angular/core';
import { User } from '../../interface/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css',

})
export class ListarUsuariosComponent implements OnInit {
   users: User[] = [];
   paginador: any;
   usuarioSeleccionado!: User
   title: string = 'Usuarios';
   titulo: string = 'Lista de Usuarios Registrados en el Sistema';
   boton: string = 'Registrar usuario';
   warning: string = 'No hay registros en la base de datos!';

   currentPage: number = 1;
   totalPages: number = 1;
   perPage: number = 5;
   totalItems: number = 0;

   constructor( private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private router: Router){}

   ngOnInit(): void {
    this.loadUsers();
   }

   loadUsers():void{
    this.authService.getUsers(this.currentPage).subscribe((response)=>{
      const {data,meta} = response;
      this.users  =   data as User[];
      this.currentPage = meta.current_page;
      this.totalPages = meta.last_page;
      this.perPage = meta.per_page;
      this.totalItems = meta.total;
      console.log(this.totalPages)
      console.log(this.users);
      console.log("Informacion meta:", meta);
    });
   }

   changePage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
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
                  'Usuario Eliminado!',
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
