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

@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,NavBarComponent],
  providers: [MessageService],
})
export class VerVentasComponent  implements OnInit {
  granTotal=0
  tabs=["DIA","SEMANA","MES","AÑO","TODOS"]
  ventas:any=[]
  activeTabIndex = 0; // Inicialmente, la primera pestaña está activa

  // Método para cambiar la pestaña activa
  setActiveTab(index: number) {
    this.activeTabIndex = index;
    let form = new FormData()
    form.append("indice",this.activeTabIndex.toString())

    this.servicio.post('getVentas',form).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.ventas=data.ventas
        this.granTotal=data.granTotal

      },
      error:(err:any)=>{
        console.log(err)
      }
    })

  }
  constructor(private servicio:ServicioService,private cdRef: ChangeDetectorRef,private zone: NgZone,private mensaje:MessageService,private modalController:ModalController) { }

  ngOnInit() {this.setActiveTab(0);}

}
