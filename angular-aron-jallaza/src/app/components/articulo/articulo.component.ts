import { Component, OnInit } from '@angular/core';
// Rutas
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { ArticulosService } from '../../services/articulos.service';
// Modelo
import { Articulo } from '../../models/articulo';
// Ventana Modal
import Swal from 'sweetalert2';
// Autentificacion Firebase
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  articulo = new Articulo();
  public admin: boolean;

  constructor(private _service: ArticulosService, private _route:ActivatedRoute, private _router: Router,private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
     // Obtenemos el ID de la url para luego llamar a nuestro servicio
     const id = this._route.snapshot.paramMap.get('id');
     if(id !== 'nuevo'){
      this._service.getArticuloById(id)
          .subscribe((data: Articulo) => {
            this.articulo = data;
            this.articulo.id = id;
      });
    }

    // Mostramos botones para editar, o no
    this.afAuth.user.subscribe(user => {
      if(user){
        this.admin = false;
      }else{
        this.admin = true;
      }
    });

  }

  // Elimiar el articulo
  borrarArticulo(id){
    // Mensaje de Alerta//Aviso
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una vez lo elimines, no podras volver a recuperarlo.",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
    .then((willDelete) => {
      if (willDelete) {
        this._service.borrarArticulo(id).subscribe((data:any) => {
          Swal.fire(
            "El articulo se ha eliminado.",
            "success",
          );
          this._router.navigate(['/blog']);
        },
        error => {
          Swal.fire("Ha ocurrido un error al eiminarlo.");
          this._router.navigate(['/blog']);
        })
      }
    });
  }

}
