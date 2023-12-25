import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ServicioService } from 'src/app/servicio.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone:true,
  providers: [MessageService],

  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule]
})
export class NavBarComponent  {
  titulo="Kimochii"
  categoriaAnime=false
  categoria:any;
  subCategoria:any;

  nuevoProducto:any={

  }
  asignarSubcat:any={}
  
categorias:any=[
  {TAB:"Producto"},
  {TAB:"Categoria/SubCategoria"},

]
subcategorias:any=[

]
indiceCategoria=0;

@Input() home=false;
  constructor(private modalController:ModalController,private servicio:ServicioService,private mensaje:MessageService) { }
  elegirCategoria(num:any){
    this.indiceCategoria=num
  }
  guardarProducto(producto:any,ref:any){
    if(ref==='1'){
      //llamar al servicio y postear el producto y Mantener la categora.
      this.nuevoProducto={}
      this.nuevoProducto.categoria=producto.categoria

      this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado el producto Exitosamente' })
      this.mensaje.add({ severity: 'error', summary: 'Ups!', detail: 'Ha ocurrido un error' })
      
    }if(ref==='2'){
      //llamar al servicio y postear el producto, mantener y cerrar el modal.
      this.nuevoProducto={}
      this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado el producto Exitosamente' })
      this.mensaje.add({ severity: 'error', summary: 'Ups!', detail: 'Ha ocurrido un error' })
      
 
    }if(ref==='3'){
      //solamente cerrar el modal
      this.nuevoProducto={  }
      this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado el producto Exitosamente' })
      this.mensaje.add({ severity: 'error', summary: 'Ups!', detail: 'Ha ocurrido un error' })
      
 
    }
  }
  getSubCategorias(ref){
    this.servicio.post('getSubCategorias',{ref:ref}).subscribe(({next:(data)=>{
      if(true){
        
      }
    }}))
  }
  catAnime(cat:any){
    console.log(cat)
    this.getSubCategorias(cat)

    if(cat=="1"){
      this.categoriaAnime=true
    }else{
      this.categoriaAnime=false
    }

  }

  crearCategoria(categoria){
    this.servicio.post('crearCategoria',{categoria:categoria}).subscribe(({next:(data)=>{
      console.log(data)
      if(true){
        this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado la categoria exitosamente' })
      }
    },
  error:(err)=>{
    console.log(err)
    this.mensaje.add({ severity: 'error', summary: 'ups!', detail: 'Ha ocurrido un error' })

  }}))
  }

  crearSubCategoria(subcategoria){
    this.servicio.post('crearSubcategoria',{subcategoria:subcategoria}).subscribe(({next:(data)=>{
      console.log(data)
      if(true){
        this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado la categoria exitosamente' })
      }
    },
  error:(err)=>{
    console.log(err)
    this.mensaje.add({ severity: 'error', summary: 'ups!', detail: 'Ha ocurrido un error' })

  }}))
  }

  asignarSubCategoria(datos){

    const form = new FormData()
    form.append('categoria',datos.categoria)
    form.append('subCategoria',datos.subCategoria)

    this.servicio.post('asignarSubCategoria',form).subscribe(({next:(data)=>{
      console.log(data)
      if(true){
        this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha asignado exitosamente' })
      }
    },
  error:(err)=>{
    console.log(err)
    this.mensaje.add({ severity: 'error', summary: 'ups!', detail: 'Ha ocurrido un error' })

  }}))
  }
  }



