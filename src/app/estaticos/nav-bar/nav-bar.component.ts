import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ServicioService } from 'src/app/servicio.service';
import { ChangeDetectorRef } from '@angular/core';
import {  NavigationEnd } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone:true,
  providers: [MessageService],

  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,RouterModule]
})
export class NavBarComponent implements OnInit  {
  titulo="Kimochii"
  categoriaAnime=false
  drawerOpen = false;

  categoria:any;
  subCategoria:any;
  proveedor=false;
  categoriaRopa=false;
  categoriaSeleccionada:any;
  tagsElegidos:any=[]
  nuevoProducto:any={

  }
  asignarSubcat:any={}
  
secciones:any=[
  {TAB:"Producto"},
  {TAB:"Categoria/SubCategoria"},

]
tags:any=[]
categorias:any=[

]
subcategoriasRef:any=[]
indiceCategoria=0;

@Input() home=true;
ngOnInit(): void {
this.getCategorias()
this.nuevoProducto.personaje=""


}

  constructor(private ngZone: NgZone,private modalController:ModalController,private servicio:ServicioService,private mensaje:MessageService,private router: Router,private cdr: ChangeDetectorRef) {
    this.subscribeToRouterEvents();
   }
   private subscribeToRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Cerrar el drawer cuando la ruta cambia
        this.drawerOpen = false;
      }
    });
  }
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
    console.log(this.drawerOpen)
  }
  navegarAAlgunLugar() {
    // Lógica para navegar a algún lugar
    this.router.navigate(['/compras']);
  }

  onFileChanged(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      console.log(file)
      const formData = new FormData();
      formData.append('foto', file);
  
      this.servicio.post('updateAmazon', formData).subscribe(({next:(data:any)=>{        if(data.success){
            this.nuevoProducto.foto=data.url;
            this.mensaje.add({severity:'success',summary:'Listo!',detail:data.message})
        }
      },
    error:(err:any)=>{
      this.mensaje.add({ severity: 'error', summary: 'Ups!', detail: err.error.error })

    }}
      
      ) );
    }
  }

  elegirCategoria(num:any){
    console.log(num)
    this.indiceCategoria=num

  }

  seleccionarCategoria(idcategoria){
    if(this.categoriaSeleccionada==idcategoria){
      this.categoriaSeleccionada=""
      return
    }else{
      this.categoriaSeleccionada=idcategoria
      this.nuevoProducto.categoria=this.categoriaSeleccionada

    }
  
  }

  seleccionarTag(idtag: any) {
    console.log(idtag);
  
    // Verificar si la categoría ya está seleccionada
    const index = this.tagsElegidos.indexOf(idtag);
  
    if (index !== -1) {
      // Si la categoría está seleccionada, eliminarla
      this.tagsElegidos.splice(index, 1);
    } else {
      // Si la categoría no está seleccionada, agregarla
      this.tagsElegidos.push(idtag);
      this.nuevoProducto.tags=this.tagsElegidos
    }
  
    console.log(this.tagsElegidos);
  }
  

  getArticulos(){
    this.servicio.get('getProducto').subscribe(({next:(data:any)=>{

    }}))
  }
  guardarProducto(producto:any,ref:any){
    if(ref==='1'){
      let form = new FormData()
      form.append('nombre',producto.nombre)
      form.append('foto',producto.foto)
      form.append('descripcion',producto.descripcion)
      form.append('categoria',producto.categoria)
      form.append('tags',JSON.stringify(producto.tags))
      form.append('costo',producto.costo)
      form.append('personaje',producto.personaje)
      form.append('precio',producto.precio)
      form.append('cantidad',producto.cantidad)
      form.append('tallaS',producto.tallaS)
      form.append('tallaM',producto.tallaM)
      form.append('tallaL',producto.tallaL)

      //llamar al servicio y postear el producto y Mantener la categora.
      this.servicio.post('guardarProducto',form).subscribe(({next:(data:any)=>{
        if(data.success){
          this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: data.message })

        }
      },error:(err:any)=>{
        this.mensaje.add({ severity: 'error', summary: 'Ups!', detail:err.message })

      }}))
      // this.nuevoProducto={}
      this.nuevoProducto.categoria=producto.categoria
      this.nuevoProducto.subcategoria=producto.subcategoria

      
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
    this.servicio.post('getSubCategorias',{ref:ref}).subscribe(({next:(data:any)=>{
      if(true){
        this.subcategoriasRef=data.subcategoria;
        console.log(this.subcategoriasRef)
      }
    }}))
  }
  catAnime(cat:any){
    console.log(cat)
    this.getSubCategorias(cat)
    
    if(cat=="3"){
      this.categoriaRopa=true
    }else{
      this.categoriaAnime=false
      this.nuevoProducto.personaje=""
    }

  }

  crearCategoria(){
    console.log(this.categoria)
    this.servicio.post('postCategoria',{categoria:this.categoria}).subscribe(({next:(data)=>{
      console.log(data)
      if(true){
        this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado la categoria exitosamente' })
     this.categoria=""
     this.getCategorias()
      }
    },
  error:(err)=>{
    console.log(err)
    this.mensaje.add({ severity: 'error', summary: 'ups!', detail: 'Ha ocurrido un error' })

  }}))
  }

  crearSubCategoria(subcategoria){

    console.log(subcategoria)
    this.servicio.post('postTag',{subcategoria:subcategoria}).subscribe(({next:(data)=>{
      console.log(data)
      if(true){
        this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha creado la categoria exitosamente' })
       this.subCategoria=""
       this.getCategorias()
      }
    },
  error:(err)=>{
    console.log(err.error)
    this.mensaje.add({ severity: 'error', summary: 'ups!', detail: err.error.error })

  }}))
  }

  asignarSubCategoria(datos){

    let form = new FormData()
    form.append('categoria',datos.categoria)
    form.append('subCategoria',datos.subCategoria)
    
  console.log(form)
    this.servicio.post('asignarSubCategoria',datos).subscribe(({next:(data)=>{
      console.log(data)
      if(true){
        this.mensaje.add({ severity: 'success', summary: 'Listo!', detail: 'Se ha asignado exitosamente' })
      }
    },
  error:(err)=>{
    console.log(err)
    this.mensaje.add({ severity: 'error', summary: 'ups!', detail: err.error.error })

  }}))
  }

  getCategorias(){
    this.servicio.get('getCategorias').subscribe(({next:(data:any)=>{
      if(true){
        this.tags=data.tags
        this.categorias=data.categoria

        console.log(data)
      }
    },
  error:(err:any)=>{
    
  }}))
  }
  }



