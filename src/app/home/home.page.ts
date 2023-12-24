import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonApp } from '@ionic/angular/standalone';
import { ServicioService } from '../servicio.service';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import { ArticulosComponent } from '../estaticos/articulos/articulos.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonApp,ArticulosComponent,NavBarComponent],
})
export class HomePage implements OnInit {
  constructor(private servicio:ServicioService) {}
ngOnInit(): void {
    this.getArticulo()
}
  getArticulo(){
    this.servicio.getProducto('getProducto').subscribe((a)=>{
      console.log(a)
    })
  }
}
