import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule]
})
export class ArticulosComponent  implements OnInit {
categorias:any=[
  {NOMBRE:"Nombre1"},
  {NOMBRE:"Nombre2"},
  {NOMBRE:"Nombre3"},
]
  indiceCategoria=0;
  constructor() { }

  ngOnInit() {console.log("hola")}
  elegirCategoria(id:any){
  this.indiceCategoria=id;
  }
}
