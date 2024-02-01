import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonApp, IonContent, IonHeader } from '@ionic/angular/standalone';
import { Toast, ToastModule } from 'primeng/toast';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss'],
  standalone:true,
  imports:[IonContent, CommonModule,ReactiveFormsModule,FormsModule,IonApp,IonHeader,ToastModule],
})
export class DevolucionesComponent  implements OnInit {
  tiendasInternacionales:any=[]
  pedidosPorTienda:any=[]
  idCompraSeleccionada:any
  divPedidoTienda=false

  devoluciones:any={}
  constructor(private servicio:ServicioService) { }

  ngOnInit() {
    this.getTiendasInternacionales()
  }


  getTiendasInternacionales(){
    this.servicio.get('getProveedores').subscribe({
      next:(data:any)=>{
        this.tiendasInternacionales=data.proveedoresInter
        console.log(this.tiendasInternacionales)
      }
    })
  }

  getPedido(idpedido){
    let form = new FormData()
    form.append('id',idpedido)
    this.servicio.post('idTiendaDevolucion',form).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.pedidosPorTienda=data.compras;
        this.divPedidoTienda=true
      }
    })

  }

  compraSeleccionada(idcompra){

    if(this.idCompraSeleccionada==idcompra){
      this.idCompraSeleccionada=null
      return
    }

      this.idCompraSeleccionada=idcompra

      console.log(this.idCompraSeleccionada,idcompra)
        
  }

  finalizarDevolucion(){
    const form = new FormData()
    form.append('id_proveedor',this.devoluciones.idTienda)
    form.append('id_compra',this.idCompraSeleccionada)

    form.append('descripcion',this.devoluciones.descripcion)
    form.append('monto',this.devoluciones.monto)

    this.servicio.post('ingresarDevolucion',form).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.devoluciones={}
        this.idCompraSeleccionada=null
        this.divPedidoTienda=false
        this.tiendasInternacionales=[]
        this.getTiendasInternacionales()
      }
    })
  }

}
