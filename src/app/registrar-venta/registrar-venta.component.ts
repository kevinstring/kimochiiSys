import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import { ModalController } from '@ionic/angular/standalone';
import { ModalRegistrarVentaComponent } from '../modal-registrar-venta/modal-registrar-venta.component';

@Component({
  selector: 'app-registrar-venta',
  templateUrl: './registrar-venta.component.html',
  styleUrls: ['./registrar-venta.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,NavBarComponent],})
export class RegistrarVentaComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log("HOLA")
  }

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
