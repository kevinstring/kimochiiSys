import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ArticulosService } from '../articulos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  constructor(private servicio:ArticulosService) {}
ngOnInit(): void {
    this.getProductos()
}

  getProductos(){
    this.servicio.get('articulos').subscribe((a:any)=>{
        console.log(a)
    })
  }
}
