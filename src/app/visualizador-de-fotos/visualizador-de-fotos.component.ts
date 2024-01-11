import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizador-de-fotos',
  templateUrl: './visualizador-de-fotos.component.html',
  styleUrls: ['./visualizador-de-fotos.component.scss'],
})
export class VisualizadorDeFotosComponent  implements OnInit {


  @Input() fotos:any

  constructor() { }

  ngOnInit() {
   
    if(this.fotos.length==0){
      this.fotos=[{FOTO:"https://i.ibb.co/3v3r4hJ/imagen-no-disponible.jpg"}]
    }
    //comprobar si fotos es arreglo o solamente un string
    if(typeof this.fotos=="string"){
      this.fotos=[{FOTO:this.fotos}]
    }

  }

}
