import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  standalone: false,
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent implements OnInit {
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

  public titulo: string = 'Crear usuario';
  public errores:any ={};

  roles: string [] =['admin','transportista','apoderado']

  constructor(private authService: AuthService,private router: Router,
    private activatedRoute:ActivatedRoute,private changeDetectorRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      console.log(id);
      if (id) {
        this.authService.getUserById(id).subscribe({
          next: ({ data }: any) => {
            this.user = data;
            console.log(this.user);
            // console.log(this.user.email)
            // setTimeout(() => {
            //   this.user.email = this.user.email;
            //   this.user.password = this.user.password;
            // });
          },
          error: (err) => {
            console.error('Error al cargar el usuario', err);
            // Maneja el error apropiadamente, por ejemplo, mostrando un mensaje al usuario
          },
        });
      }
    });
  }

  create(): void{
    this.authService.registerUser(this.user).subscribe(
      (user) =>{
        this.router.navigate(['/usuarios'])
        Swal.fire(
          'Nuevo usuario creado!!',
          `El usuario ${user.name} ${user.last_name} ha sido creado con éxito!!`,
          'success'
        )
      },
      (err:any) =>{
        this.errores = err.error.error as string[]
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.error);
        Swal.fire(
          'Error',
          'Ocurrio un error al ingreso del usuario',
          'error'
        )
      }
    )
  }

  update(): void{
    this.authService.updateUser(this.user).subscribe(
      ({message,data}: any)=>{
        this.router.navigate(['usuarios/listar-usuarios']);
        Swal.fire(
          'Usuario actualizado',
          `${message}: de nombre ${data.name} ${data.last_name}`,
          'success'
        )
      },
      (err) => {
        if (err.error && err.error.telefono) {
          let mensajes = err.error.telefono.join('\n'); // Obtiene los mensajes y los une con saltos de línea
          Swal.fire(
            'Error',
            mensajes, // Muestra los mensajes formateados
            'error'
          );
        } else if (err.error) {
            let errorMessages = Object.values(err.error).flat();
            Swal.fire(
                'Error',
                errorMessages.join('\n'),
                'error'
            )
        } else {
          Swal.fire(
            'Error',
            'Ocurrió un error inesperado',
            'error'
          );
        }
        console.error(err.error);
      }
    )
  }
}
