import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';

import { Router, RouterModule } from '@angular/router';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,NavBarComponent,RouterModule,ReactiveFormsModule,RouterModule,FormsModule]
})
export class DescuentosComponent  implements OnInit {
descuentoGeneral=false
descuentoUnitario=false

tiendas:any
categorias:any


idTienda=0
idCategoria=0

idProducto=null



descuentosGeneral={
  montoADescontar:0,
  multiploGeneral:0
}

descuentosUnitario={
  idProducto:null,
  montoADescontar:0,
  multiplo:0
}

  constructor(private servicio:ServicioService) { }

  ngOnInit() {this.getInfoDescuentos()}

  divDescuentoGeneral(){
    this.descuentoGeneral=true
    this.descuentoUnitario=false
  }

  divDescuentoUnitario(){
    this.descuentoGeneral=false
    this.descuentoUnitario=true
  }

  getInfoDescuentos(){

    this.servicio.get('getDatosDescuento').subscribe({next:(data:any)=>{
      console.log(data)
     
      this.tiendas=data.tiendas
      this.categorias=data.categorias
    

    },
    error:(error:any)=>{
      console.log(error)
    }


    })

  }

  aplicarDescuentoG(){
    console.log(this.descuentosGeneral)
    console.log(this.idTienda)
    console.log(this.idCategoria)

    let form = new FormData()



    form.append('montoADescontar',this.descuentosGeneral.montoADescontar.toString())
    form.append('multiploGeneral',this.descuentosGeneral.multiploGeneral.toString())
    form.append('idTienda',this.idTienda.toString())
    form.append('idCategoria',this.idCategoria.toString())
    


    this.servicio.post('descuentosGeneral',form).subscribe((data:any)=>{
      console.log(data)
    })

  }
}
