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
  selector: 'app-venta-credito',
  templateUrl: './venta-credito.component.html',
  styleUrls: ['./venta-credito.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule],
  providers: [MessageService],

})
export class VentaCreditoComponent  implements OnInit {
  tipoDePago =''
  ventasCredito:any=[]

  constructor(private servicio:ServicioService,private cdRef: ChangeDetectorRef,private zone: NgZone,private mensaje:MessageService,private modalController:ModalController) { }

  ngOnInit() {this.getVentasFiadas()}

  getVentasFiadas(){
    this.servicio.get("getVentaFiada").subscribe({next:(data:any)=>{
      console.log(data)
      this.ventasCredito=data.ventas
    },
    error:(error:any)=>{
      console.log(error)
    }


    })
  }

  obtenerTipoPago(tipo){
    this.tipoDePago=tipo
  }

  cobrarVenta(venta){
    let form = new FormData()
    form.append("idFactura",venta.ID_FACTURA)
    form.append("tipoPago",this.tipoDePago)
    form.append("total",venta.TOTAL)

 
    this.servicio.post("cobrarVentaFiada",form).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.mensaje.add({ severity: 'success', summary: 'Success', detail: data.message });
        this.getVentasFiadas()
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

}
