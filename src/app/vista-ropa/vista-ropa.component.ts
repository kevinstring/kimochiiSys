import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import { ModalController } from '@ionic/angular/standalone';
import { ModalRegistrarVentaComponent } from '../modal-registrar-venta/modal-registrar-venta.component';
import { VerVentasComponent } from '../ver-ventas/ver-ventas.component';
import { Router, RouterModule } from '@angular/router';
import { VentaCreditoComponent } from '../venta-credito/venta-credito.component';
import { DevolucionesComponent } from '../devoluciones/devoluciones.component';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-vista-ropa',
  templateUrl: './vista-ropa.component.html',
  styleUrls: ['./vista-ropa.component.scss'],
  
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,NavBarComponent,RouterModule,FormsModule],})

export class VistaRopaComponent  implements OnInit {
ropas:any=[]
ropaTalla:any
selectedTalla="n"
  constructor(private servicio:ServicioService) { }

  ngOnInit() {
    this.getRopa()
  }

  convertirCadenaAArray(cadena: string): string[] {
    try {
      const array = JSON.parse(cadena);
      if (Array.isArray(array)) {
        return array;
      }
    } catch (error) {
      console.error('Error al convertir la cadena a un array:', error);
    }
    return [];
  } 
  


  getRopa(){
    let form = new FormData()
    form.append('talla',this.selectedTalla)

    this.servicio.post('getRopaTalla',form).subscribe({
      next:(data:any)=>{
        this.ropas=data.ropa
        console.log(data)
      }
    })
  }
}
