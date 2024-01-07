import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import { IonicModule } from '@ionic/angular';
import { ServicioService } from '../servicio.service';
import { ToasterService } from '../toaster.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

import autoTable from 'jspdf-autotable'

import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  standalone:true,
  imports:[NavBarComponent,IonicModule,ToastModule,CommonModule,ReactiveFormsModule,FormsModule,CurrencyPipe],
  providers:[MessageService]

})
export class PedidosComponent  implements OnInit {

  pedidos:any=[]
satisfaccion=[]
pedidoUnitario:any={}
valoracion:any
observaciones=""
  estadoPedido:any=[] 
estadoSeleccionado=5
  constructor(private servicio:ServicioService,private mensaje:MessageService) { }

  ngOnInit() {
 this.getEstadoPedido("5")
 this.getPedidos()
  }
  
  pedidoAtrasado( pedido)
  {

    const form =  new FormData()
    form.append("id",pedido.ID_COMPRA)
    form.append("estado","5")
    this.servicio.post('pedidoAtrasadoDeTiempo',form).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.mensaje.add({ severity: 'success', summary: 'Success', detail: data.message });
        
        this.getEstadoPedido(this.estadoSeleccionado)
      },
      error:(err:any)=>{
        console.log(err)
  
  
      },
      complete:()=>{
        console.log("complete")
        this.mensaje.clear()
  
      }
      })
  }



  getEstadoPedido(estado){
      this.estadoSeleccionado=estado
      const form =  new FormData()
      form.append("estado",this.estadoSeleccionado.toString())
  this.servicio.post('getComprasPedidos',form).subscribe({
    next:(data:any)=>{
      console.log(data)
      this.pedidos=data.resultado;

    },
    error:(err:any)=>{
      console.log(err)
    }
  })

  }

  cambiarEstado(pedido) {
    const form = new FormData();
    form.append("id", pedido.ID_COMPRA);
    form.append("estado", pedido.ID_ESTADO);
  
    this.servicio.post('cambiarEstadoPedido', form).subscribe({
      next: (data: any) => {
        console.log(data);
        this.mensaje.add({ severity: 'success', summary: 'Success', detail: data.message });
  

  
        this.getEstadoPedido(this.estadoSeleccionado);
        this.getPedidos()

      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("complete");
        this.mensaje.clear();
      }
    });
  }

retrasarEstado(pedido){
  const form =  new FormData()
  form.append("id",pedido.ID_COMPRA)
  form.append("estado",pedido.ID_ESTADO)
this.servicio.post('retrasarEstadoPedido',form).subscribe({
next:(data:any)=>{
  console.log(data)
  this.getEstadoPedido(this.estadoSeleccionado)
},
error:(err:any)=>{
  console.log(err)

}
})


}

getPedidos() {
    this.estadoPedido=["PEDIDO","EN TRANSITO","EN GUATEMALA","OBTENIDO","TODO","ATRASADO"]
  this.servicio.get('getPedidos').subscribe({
    next: (data: any) => {
      console.log(data);

      // Crear un nuevo array para almacenar la combinación de estadoPedido y conteoEstados
      const nuevoEstadoPedido = this.estadoPedido.map((element: any) => {
        const cantidad = data.conteoEstados[element] || 0;
        return { estado: element, cantidad };
      });

      // Ahora tienes un array con objetos que tienen el estado y la cantidad correspondiente
      console.log(nuevoEstadoPedido);
      this.estadoPedido = nuevoEstadoPedido;  // Actualizar estadoPedido solo después de obtener nuevos datos
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}


getSatisfaccion(pedido){
this.pedidoUnitario=pedido
  this.servicio.get('getSatisfaccion').subscribe({
    next:(data:any)=>{
      console.log(data)
     this.satisfaccion = data.resultado
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}
obtenerValoracion(estrellas){
  this.valoracion=estrellas  
}
valorar(){

  const form =  new FormData()
  form.append("id",this.pedidoUnitario.ID_COMPRA)
  form.append("valoracion",this.valoracion.ID_SATISFACCION)
  form.append("comentario",this.observaciones)

this.servicio.post('valorarPedido',form).subscribe({
next:(data:any)=>{
  console.log(data)
  this.getEstadoPedido(this.estadoSeleccionado)
  this.observaciones=""
},
error:(err:any)=>{
  console.log(err)

}
})
}
}
