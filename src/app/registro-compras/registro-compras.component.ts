import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import { IonicModule } from '@ionic/angular';
import { ServicioService } from '../servicio.service';
import { ToasterService } from '../toaster.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-compras',
  templateUrl: './registro-compras.component.html',
  styleUrls: ['./registro-compras.component.scss'],
  standalone:true,
  imports:[NavBarComponent,IonicModule,ToastModule,CommonModule,ReactiveFormsModule,FormsModule,CurrencyPipe],
  providers:[MessageService]
})
export class RegistroComprasComponent  implements OnInit {
  proveedor:any = {}
  compra:any={}
  indiceMes:any
  proveedorGet:any=[]
  compraGet:any=[]
  compraTotal:any
  meses:any=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  constructor(private servicio:ServicioService,private mensaje:MessageService) { }

  ngOnInit() {
    this.getProveedores()
  }

  getProveedores(){
  this.servicio.get('getProveedores').subscribe({next:(data:any)=>{
    console.log(data)
    this.proveedorGet=data.proveedores
    // this.mensaje.add({severity:'success',summary:'Exito',detail:'Se han obtenido los proveedores'})
  },
  error:(err:any)=>{
    console.log(err)
  }

  })
  }

  agregarProveedor(proveedor){
    let form = new FormData()
    form.append('nombreProveedor',proveedor.nombreProveedor)
    form.append('telefono',proveedor.telefono)
    form.append('nombreTienda',proveedor.tienda)
    form.append('direccion',proveedor.direccion)


    this.servicio.post('postProveedores',form).subscribe({next:(data:any)=>{
      console.log(data)
      this.mensaje.add({severity:'success',summary:'Exito',detail:'Se ha agregado el proveedor'})
    },
    error:(err:any)=>{
      console.log(err)
    }
  
    })
  }

  getCompra(){
    
    let form = new FormData()
    form.append('indiceMes',this.indiceMes)
this.servicio.post('getCompras',form).subscribe({next:(data:any)=>{

  this.compraGet=data.compras
  this.compraTotal=data.granTotal
  console.log(data)
}
,

    error:(err:any)=>{
      console.log(err)
    }
  
    })
  
  }

  agregarCompra(compra){
    let form = new FormData()
    form.append('idProveedor',compra.proveedor)
    form.append('fecha',compra.fecha)
    form.append('monto',compra.monto)
    form.append('descripcion',compra.descripcion)

    this.servicio.post('postCompras',form).subscribe({next:(data:any)=>{
      console.log(data)
      this.mensaje.add({severity:'success',summary:'Exito',detail:'Se ha agregado la compra'})
    },
    error:(err:any)=>{
      console.log(err)
    }
  
    })
  }

  
}