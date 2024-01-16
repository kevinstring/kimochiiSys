import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicioService } from '../servicio.service';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModalController } from '@ionic/angular/standalone';
import { NavBarComponent } from '../estaticos/nav-bar/nav-bar.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
@Component({
  selector: 'app-ver-ventas',
  templateUrl: './ver-ventas.component.html',
  styleUrls: ['./ver-ventas.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,NavBarComponent,NgxChartsModule],
  providers: [MessageService],
})
export class VerVentasComponent  implements OnInit {

  multi: any[];
  view: any[] = [700, 300];

  viewVBC: [number, number] = [800, 300];
  animationsVBC = false;
  legendVBC = true;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  yAxisLabelVBC = "Amount in Trillions ($)";

  dataLabelFormatterVBC(tooltipText: any) {
    return "$" + tooltipText + " trillion";
  }
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;

  timeline: boolean = false;

  colorScheme:any = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"]
  };
  onSelect(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  granTotal=0
  tabs=["DIA","SEMANA","MES","AÑO","TODOS"]
  ventas:any=[]
  activeTabIndex = 0; // Inicialmente, la primera pestaña está activa


  convertirMulti(objeto){
    const multi = [
      {
        name: objeto.name,
        series: objeto.series.map((item) => {
          return {
            name: item.name,
            value: item.value,
          };
        }
        ),

      },
    ];
    return multi

  }
  // Método para cambiar la pestaña activa
  setActiveTab(index: number) {
    this.activeTabIndex = index;
    let form = new FormData()
    form.append("indice",this.activeTabIndex.toString())

    this.servicio.post('getVentas',form).subscribe({
      next:(data:any)=>{
        console.log(data)
        this.ventas=data.chartData
        this.granTotal=data.granTotal

        this.multi=this.convertirMulti(data.chartData)



      },
      error:(err:any)=>{
        console.log(err)
      }
    })

  }
  constructor(private servicio:ServicioService,private cdRef: ChangeDetectorRef,private zone: NgZone,private mensaje:MessageService,private modalController:ModalController) { }

  ngOnInit() {this.setActiveTab(0);}

}
