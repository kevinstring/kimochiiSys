import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicioService } from '../servicio.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-modal-registrar-venta',
  templateUrl: './modal-registrar-venta.component.html',
  styleUrls: ['./modal-registrar-venta.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule],
  providers: [MessageService],

})
export class ModalRegistrarVentaComponent  implements OnInit {
  ventaRegistrada=false
  loading=false
  categorias:any=[]
  venta:any={}
  ventaRealizada:any
  productos:any=[]
  productoVenta:any={}
  arregloProductos:any=[]
  indice:any
  constructor(private servicio:ServicioService,private cdRef: ChangeDetectorRef,private zone: NgZone,private mensaje:MessageService) { }

  ngOnInit() {
    this.getCategorias()
    console.log(this.categorias)

  }
  cerrarModal(){
    console.log("HOLA")
  }

  registrarVenta(){
    this.loading=true
    let form = new FormData()
    form.append("fecha",this.venta.fecha)
    form.append("nombreCliente",this.venta.nombreCliente)
    form.append("tipoPago",this.venta.tipoPago)
    form.append("esEnvio",this.venta.esEnvio)


    this.servicio.post('registrarVenta',form).subscribe({
      next:(data:any)=>{
        this.loading=false
        console.log(data)
        this.ventaRealizada=data.venta;

        this.ventaRegistrada=true
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }


  getCategorias(){
    this.servicio.get('getCategorias').subscribe({
      next:(data:any)=>{
        this.categorias=data.categoria
        console.log(data)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

getProductosEnStock(){
  this.servicio.get('getProductosEnStock').subscribe({
    next:(data:any)=>{
      console.log(data)

    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}

consultaProductos(idcategoria:any){
  let form = new FormData()
  form.append('idcategoria',idcategoria)
  this.servicio.post('getProductosEnStock',form).subscribe({
    next:(data:any)=>{
      this.productos=data.productos
      console.log(data)
      console.log(this.ventaRealizada)
    },  
    error:(err:any)=>{
      console.log(err)
    }
  })
}

agregarProducto(producto: any,i:any) {
  this.indice=i;
  const index = this.arregloProductos.findIndex(p => p.ID_PRODUCTO === producto.ID_PRODUCTO);
const form = new FormData();
form.append('codigoProducto',producto.CODIGO)
form.append('idVenta',this.ventaRealizada)
  if (index !== -1) {
    // El producto ya está en el carrito, incrementar la cantidad
    this.arregloProductos[index].cantidadSeleccionada += 1;
    form.append('cantidad',this.arregloProductos[index].cantidadSeleccionada)

  } else {
    // El producto no está en el carrito, agregarlo con cantidad 1
    this.arregloProductos.push({ ...producto, cantidadSeleccionada: 1 });
    form.append('cantidad','1');
  }
  console.log(this.arregloProductos)


  this.servicio.post('postComanda',form).subscribe({
    next:(data:any)=>{
      console.log(data)
      this.mensaje.add({severity:'success',summary:'Exito',detail:'Se ha agregado el producto'})


    },  
    error:(err:any)=>{
      console.log(err)
      this.mensaje.add({severity:'error',summary:'Error',detail:'Ha ocurrido un error al agregar el producto'})
    }
  })


  // let form = new FormData()
  // form.append('idproducto',producto.idproducto)
  // form.append('cantidad',producto.cantidad)
  // form.append('precio',producto.precio)
  // form.append('idventa',this.venta.idventa)
  // this.servicio.post('agregarProductoAVenta',form).subscribe({
  //   next:(data:any)=>{
  //     console.log(data)
  //   },
  //   error:(err:any)=>{
  //     console.log(err)
  //   }
  // })
}

}
