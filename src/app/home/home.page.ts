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
  productos:any=[]
  ropa:any=[]
ngOnInit(): void {
    this.getArticulo()
}
getArticulo() {
  this.servicio.get('getProducto').subscribe({
    next: (data: any) => {
      this.productos = data.productos;
      if (data.ropa) {
       this.ropa=data.ropa
      }
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

}
