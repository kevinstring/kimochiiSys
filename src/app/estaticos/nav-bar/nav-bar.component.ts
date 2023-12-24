import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule]
})
export class NavBarComponent  {
  titulo="Kimochii"
  categoriaAnime=false
  nuevoProducto:any={

  }
@Input() home=false;
  constructor(private modalController:ModalController) { }

  guardarProducto(){
    console.log(this.nuevoProducto)
  }
  catAnime(cat:any){

    if(cat===1){
      console.log(cat)
      this.categoriaAnime=true
    }

  }

}
