import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Toast, ToastModule } from 'primeng/toast';
import { ServicioService } from 'src/app/servicio.service';
import { MessageService } from 'primeng/api';
import { QRCodeModule } from 'angularx-qrcode';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  standalone:true,
  providers: [MessageService],

  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,QRCodeModule]
})
export class ArticulosComponent  implements OnInit {
@Input() productos:any=[]
idEdicion:any
hola="hola"
qrlinkdescarga=""
categorias:any=[
  {NOMBRE:"Nombre1"},
  {NOMBRE:"Nombre2"},
  {NOMBRE:"Nombre3"},
]
productoEditado:any={}
editar=false;
articulos:any=[]
  indiceCategoria=0;
  constructor(private servicio:ServicioService,private mensaje:MessageService) {

   }

  ngOnInit() {console.log(this.productos)}
  elegirCategoria(id:any){
  this.indiceCategoria=id;
  }

  editarProducto(producto,id){
    this.idEdicion=id
this.editar=true;
console.log(producto)
  }

  finalizarEditarProducto(){
    this.editar=false
    this.idEdicion=0
    console.log(this.productoEditado)
    const form = new FormData()
   
    this.productoEditado={}
    this.mensaje.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

  }
  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  
  fileChanged(event: any) {
    // Assuming you want to display the selected file path
    console.log(event.target.value);

    // If you want to actually handle the file, you can use FileReader
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (e: any) => {
      this.productoEditado.imagen = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  generatePDF(producto, event) {
    // Accede al Blob correctamente desde el evento
    const blob = event.target.files[0];
  
    // Realiza la conversión a base64
    this.blobToBase64(blob).then((data: any) => {
      console.log(data);
    });
  }
  
  downloadQR(){
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement('a');
 
    const pdf = new jsPDF();

    // Agrega la imagen QR al PDF
    pdf.addImage(pngUrl, 'PNG', 10, 10, 80, 80); // Ajusta las coordenadas y dimensiones según sea necesario
  
    // Descarga el documento PDF
    pdf.save("qr.pdf");
    // downloadLink.href = pngUrl;
    // downloadLink.download = "qr.png";
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
  }

  


  
}
