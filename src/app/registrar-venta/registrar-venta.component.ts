import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import { ModalController } from '@ionic/angular/standalone';
import { ModalRegistrarVentaComponent } from '../modal-registrar-venta/modal-registrar-venta.component';
import { VerVentasComponent } from '../ver-ventas/ver-ventas.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,NavBarComponent,RouterModule],})
export class RegistrarVentaComponent {

  constructor(private modalController: ModalController) { }



  modalRegistrarVenta(){
    const modal = this.modalController.create({
      component: ModalRegistrarVentaComponent,
      // cssClass: 'custom-modal'
    });
    modal.then((modalElement)=>{
      modalElement.present();
    })

  }



}
