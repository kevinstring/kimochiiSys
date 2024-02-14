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
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss'],
  standalone: true
  ,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,NavBarComponent,NgxChartsModule],
    
})
export class GastosComponent  implements OnInit {
agregarGasto:any={}
tiempos:any=[{tiempo:'dia'},{tiempo:'semana'},{tiempo:'mes'},{tiempo:'año'}]
gastos:any=[]
total=0
datos:any=[]

  constructor(private servicio:ServicioService) { }

  ngOnInit() {
    this.getTotales()
  }


  getTotales(){
    this.servicio.get('getGastoYVentaTotal').subscribe({next:(data:any)=>{
      console.log(data)
     this.datos=data


    }
    ,
    error:(error:any)=>{
      console.log(error)
    }

    })
  }

  ingresarGasto(){
    let form = new FormData()
    form.append('fecha',this.agregarGasto.fecha)
    form.append('motivo',this.agregarGasto.motivo)
    form.append('monto',this.agregarGasto.monto)
    form.append('titulo',this.agregarGasto.titulo)

    
    this.servicio.post('postGasto',this.agregarGasto).subscribe({next:(data:any)=>{
      console.log(data)
    }
    ,
    error:(error:any)=>{
      console.log(error)

    }

    })
  }

  verGastos(tiempo){
    let form = new FormData()
    form.append('tipoTiempo',tiempo)
    this.servicio.post('getGastosPorTiempo',form).subscribe({next:(data:any)=>{
      console.log(data)
      this.gastos=data.gastos
      this.total=data.total
      this.datos=data.datos
    }
    ,
    error:(error:any)=>{
      console.log(error)
    }

    })

  }



}
