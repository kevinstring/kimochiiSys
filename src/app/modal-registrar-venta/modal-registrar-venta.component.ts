import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicioService } from '../servicio.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-registrar-venta',
  templateUrl: './modal-registrar-venta.component.html',
  styleUrls: ['./modal-registrar-venta.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule],
  providers: [MessageService],

})
export class ModalRegistrarVentaComponent  implements OnInit {
  ventaRegistrada=false
  esRopa=  false
  ropa:any=[]
  loading=false
  categorias:any=[]
  venta:any={}
  ventaRealizada:any
  productos:any=[]
  productoVenta:any={}
  
  arregloProductos:any=[{cantidadSeleccionada:0}]
  arregloContador:any=[{codigoProducto:' ',cantidadSeleccionada:0}]
  indice:any
  categoriaElegida =0;
  constructor(private servicio:ServicioService,private cdRef: ChangeDetectorRef,private zone: NgZone,private mensaje:MessageService,private modalController:ModalController) { }

  ngOnInit() {
    this.getCategorias()
    console.log(this.categorias)

  }
  cerrarModal(){
    this.modalController.dismiss()
    console.log("HOLA")
  }

  cambiarEstadoRopa(){

     this.esRopa=true
     this.servicio.get('getRopa').subscribe({
      next:(data:any)=>{
        this.productos=data.ropa
        this.ropa=data.ropa.map((element:any)=>{
          return element.TALLAS
        })
        console.log( this.ropa)
      },
      error:(err:any)=>{
        console.log(err)
      }
     })
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
  this.esRopa=false
  this.categoriaElegida=idcategoria
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

finalizarVenta(){
  let form = new FormData()
  form.append('idVenta',this.ventaRealizada)
  this.servicio.post('finalizarVenta',form).subscribe({
    next:(data:any)=>{
      console.log(data)
      this.mensaje.add({severity:'success',summary:'Exito',detail:'Se ha finalizado la venta'})
      this.ventaRegistrada=false
      this.venta={}
      this.productos=[]
      this.productoVenta={}
      this.arregloProductos=[]
      this.indice=0;
      this.categoriaElegida=0;
      this.cerrarModal()
    },  
    error:(err:any)=>{  
      console.log(err)
    }
  })
}

cancelarVentaYFactura(){
  let form = new FormData()
  form.append('idVenta',this.ventaRealizada)
  this.servicio.post('cancelarVentaYFacturar',form).subscribe({
    next:(data:any)=>{
      console.log(data)
      this.mensaje.add({severity:'success',summary:'Exito',detail:'Se ha cancelado la venta y se ha generado la factura'})
      this.ventaRegistrada=false
      this.venta={}
      this.productos=[]
      this.productoVenta={}
      this.arregloProductos=[]
      this.indice=0;
      this.categoriaElegida=0;
      this.cerrarModal()
    },  
    error:(err:any)=>{  
      console.log(err)
    }
  })
}

cancelarVenta(){
  let form = new FormData()


      this.mensaje.add({severity:'success',summary:'Exito',detail:'Se ha cancelado la venta'})
      this.ventaRegistrada=false
      this.venta={}
      this.productos=[]
      this.productoVenta={}
      this.arregloProductos=[]
      this.indice=0;
      this.categoriaElegida=0;
      this.cerrarModal()

}
objectValues(obj: any) {
  return Object.values(obj) as Array<{ codigoProducto: string, cantidadSeleccionada: number }>;
}



agregarProducto(producto: any, i: any,talla:any) {
  console.log(talla)
  if (producto.CANTIDAD == 0) {
    this.mensaje.add({ severity: 'error', summary: 'Error', detail: 'No hay stock de este producto' });
    return;
  }
  const form = new FormData();

  if(talla!=="N"){
    form.append('talla',talla)
  }

  form.append('codigoProducto', producto.CODIGO);
  form.append('idVenta', this.ventaRealizada);

  const index = this.arregloProductos.findIndex(p => p.ID_PRODUCTO === producto.ID_PRODUCTO);

  if (index !== -1) {
    // El producto ya está en el carrito, incrementar la cantidad
    this.arregloProductos[index].cantidadSeleccionada += 1;

    // Buscar en arregloContador y actualizar la cantidad
    const contadorIndex = this.arregloContador.findIndex(contador => contador.codigoProducto === producto.CODIGO);

    if (contadorIndex !== -1) {
      this.arregloContador[contadorIndex].cantidadSeleccionada += 1;
    } else {
      // Esto no debería suceder, pero si sucede, manejarlo adecuadamente
      console.error('Error: No se encontró el producto en arregloContador');
    }

    form.append('cantidad', this.arregloProductos[index].cantidadSeleccionada.toString());
  } else {
    // El producto no está en el carrito, agregarlo con cantidad 1
    this.arregloProductos.push({ ...producto, cantidadSeleccionada: 1 });

    // Agregar a arregloContador con cantidad 1
    this.arregloContador.push({ codigoProducto: producto.CODIGO, cantidadSeleccionada: 1 });

    form.append('cantidad', '1');
  }

  this.servicio.post('postComanda', form).subscribe({
    next: (data: any) => {
      console.log(data);
      this.consultaProductos(this.categoriaElegida);
console.log(this.arregloProductos)
      this.mensaje.add({ severity: 'success', summary: 'Exito', detail: 'Se ha agregado el producto' });
    },
    error: (err: any) => {
      console.log(err);
      this.mensaje.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error al agregar el producto' });
    }
  });
}


}
