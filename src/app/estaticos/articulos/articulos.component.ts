import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Toast, ToastModule } from 'primeng/toast';
import { ServicioService } from 'src/app/servicio.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  standalone:true,
  providers: [MessageService],

  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule]
})
export class ArticulosComponent  implements OnInit {
@Input() productos:any=[]
idEdicion:any
categorias:any=[
  {NOMBRE:"Nombre1"},
  {NOMBRE:"Nombre2"},
  {NOMBRE:"Nombre3"},
]
productoEditado:any={}
editar=false;
articulos:any=[]
  indiceCategoria=0;
  constructor(private servicio:ServicioService,private mensaje:MessageService) {

   }

  ngOnInit() {console.log(this.productos)}
  elegirCategoria(id:any){
  this.indiceCategoria=id;
  }

  editarProducto(producto,id){
    this.idEdicion=id
this.editar=true;
console.log(producto)
  }

  finalizarEditarProducto(){
    this.editar=false
    this.idEdicion=0
    console.log(this.productoEditado)
    const form = new FormData()
   
    this.productoEditado={}
    this.mensaje.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }

  fileChanged(event: any) {
    // Assuming you want to display the selected file path
    console.log(event.target.value);

    // If you want to actually handle the file, you can use FileReader
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e: any) => {
      this.productoEditado.imagen = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
