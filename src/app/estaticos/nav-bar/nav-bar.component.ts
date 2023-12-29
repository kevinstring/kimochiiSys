import { CommonModule, JsonPipe } from '@angular/common';
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
export class NavBarComponent implements OnInit  {
  titulo="Kimochii"
  categoriaAnime=false
  categoria:any;
  subCategoria:any;
  categoriaRopa=false;
  nuevoProducto:any={

  }
  asignarSubcat:any={}
  
secciones:any=[
  {TAB:"Producto"},
  {TAB:"Categoria/SubCategoria"},

]
categorias:any=[]
subcategorias:any=[

]
subcategoriasRef:any=[]
indiceCategoria=0;

@Input() home=false;
ngOnInit(): void {
this.getCategorias()
this.nuevoProducto.personaje=""


}

  constructor(private modalController:ModalController,private servicio:ServicioService,private mensaje:MessageService) { }
 
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
    this.indiceCategoria=num
  }
  guardarProducto(producto:any,ref:any){
    if(ref==='1'){
      let form = new FormData()
      form.append('nombre',producto.nombre)
      form.append('foto',producto.foto)
      form.append('descripcion',producto.descripcion)
      form.append('categoria',producto.categoria)
      form.append('subcategoria',producto.subcategoria)
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
    this.servicio.post('postSubCategoria',{subcategoria:subcategoria}).subscribe(({next:(data)=>{
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
        this.categorias=data.categoria
        this.subcategorias=data.subcategoria

        console.log(data)
      }
    },
  error:(err:any)=>{
    
  }}))
  }
  }



