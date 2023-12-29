import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, Input, NgModule, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Toast, ToastModule } from 'primeng/toast';
import { ServicioService } from 'src/app/servicio.service';
import { MessageService } from 'primeng/api';
import { QRCodeModule } from 'angularx-qrcode';
import { jsPDF } from 'jspdf'
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  standalone:true,
  providers: [MessageService],

  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,QRCodeModule]
})
export class ArticulosComponent  implements OnInit {
  @ViewChild('ide', { static: true }) qrcElement: ElementRef;

@Input() productos:any=[]
@Input() ropa:any=[]
idEdicion:any
hola="hola"
verRopa=false
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
  if(id==1){
this.verRopa=true
    console.log(this.productos)

  }else{
    this.verRopa=false
   
  }

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

  generateQRCodeAndPDF(product: any) {
    const qrCodeValue = product.CODIGO; // Valor que se utilizará para el código QR
    const qrCodeSize = typeof product.qrCodeSize === 'number' ? product.qrCodeSize : 150;

    // Puedes ajustar las opciones según tus necesidades
    const qrCodeOptions = {
      width: qrCodeSize,
      height: qrCodeSize,
    };

    // Agrega el valor y las opciones al producto
    product.qrCodeUrl = qrCodeValue;
    product.qrCodeOptions = qrCodeOptions;

    // Lógica para generar el PDF
    const documentDefinition = {
      pageSize: { width: 200, height: 300 }, // Ajusta el tamaño según el de tu etiqueta
      pageMargins: [0, 0, 0, 0], // Puedes ajustar los márgenes según tus necesidades
      styles: {
        center: { alignment: 'center' },
      },
      content: []
    };

    for (let i = 0; i < product.CANTIDAD; i++) {
      // Agrega el nombre del producto en grande
      documentDefinition.content.push({ text: product.NOMBRE_PRODUCTO, fontSize: 24, bold: true, style: 'center' });
      
      // Agrega la categoría centrada
      documentDefinition.content.push({ text: `${product.NOMBRE_SUBCAT}`, fontSize: 16, style: 'center' });
      documentDefinition.content.push({ text: `\n\n` });

      // Agrega el código QR centrado
      documentDefinition.content.push({ qr: product.CODIGO, alignment: 'center', fit: [150]  });
      documentDefinition.content.push({ text: `\n` });
      documentDefinition.content.push({ text: `Q${product.PRECIO}`, fontSize: 28, bold: true, style: 'center' });

      // Agrega un salto de página después de cada producto
      documentDefinition.content.push({ text: '\n', pageBreak: 'after' });
  
    }

    pdfMake.createPdf(documentDefinition).open();
  }
  
  generateQRCodeAndPDFRopa(product: any) {
    const qrCodeSize = typeof product.qrCodeSize === 'number' ? product.qrCodeSize : 150;
  
    // Puedes ajustar las opciones según tus necesidades
    const qrCodeOptions = {
      width: qrCodeSize,
      height: qrCodeSize,
    };
  
    // Lógica para generar el PDF
    const documentDefinition = {
      pageSize: { width: 200, height: 300 }, // Ajusta el tamaño según el de tu etiqueta
      pageMargins: [0, 0, 0, 0], // Puedes ajustar los márgenes según tus necesidades
      styles: {
        center: { alignment: 'center' },
      },
      content: [],
    };
  
    // Itera sobre las tallas y agrega detalles específicos de la talla
    for (const talla in product.TALLAS) {
      if (product.TALLAS.hasOwnProperty(talla)) {
        const cantidadTalla = product.TALLAS[talla];
  
        // Agrega detalles específicos de la talla, como la cantidad
   
        // Agrega el código QR específico de la talla
        for (let j = 0; j < cantidadTalla; j++) {
          // Agrega el nombre del producto en grande solo en la primera iteración
         
          documentDefinition.content.push({ text: `${product.NOMBRE_SUBCAT}`, fontSize: 18, style: 'center' });

          documentDefinition.content.push({ text: talla, fontSize: 28, bold: true, style: 'center' });
            documentDefinition.content.push({ text: `\n` });
          
          
          documentDefinition.content.push({ qr: `${product.CODIGO}-${talla}`, alignment: 'center', fit: [150] });
          documentDefinition.content.push({ text: `\n` });
          documentDefinition.content.push({ text: 'Q'+product.PRECIO, fontSize: 28, bold: true, style: 'center' });
          documentDefinition.content.push({ text: `\n\n` });


        }
      }
    }
  
    pdfMake.createPdf(documentDefinition).open();
  }
  
  


  
}
