import { CommonModule, NgIf, NumberFormatStyle, NumberSymbol, formatNumber, formatPercent } from '@angular/common';
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

  imports:[IonicModule,CommonModule,ReactiveFormsModule,FormsModule,ToastModule,QRCodeModule,]
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

 async ngOnInit() {
this.getArticulo()
   console.log(this.productos)}
   getArticulo() {
    this.servicio.get('getProducto').subscribe({
      next: (data: any) => {
        data.productos.forEach((element: any) => {
          element.FOTO = this.quitarParteIndeseada(element.FOTO);
        });
  
        this.productos = data.productos;
  
        console.log(this.productos);
  
        if (data.ropa) {
          this.ropa = data.ropa;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
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

  quitarParteIndeseada(urlCompleta: string): string {
    const parteIndeseada = "https://kimochii.s3.amazonaws.com";
    return urlCompleta.replace(parteIndeseada, '');
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
    // Lógica para generar el PDF
    const documentDefinition = {
      pageSize: { width: 600, height: 800 },
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          stack: this.createRows(product),
          unbreakable: true, // Evita que el stack se divida en varias páginas
        }
      ],
    };
  
    pdfMake.createPdf(documentDefinition).open();
  }
  
  // Función para crear los conjuntos de elementos en una fila
  createRows(product: any) {
    const rows = [];
  
    for (let i = 0; i < product.CANTIDAD; i++) {
      const row = [
        { text: product.NOMBRE_PRODUCTO, fontSize: 12, bold: true, alignment: 'center' },
        { text: `${product.NOMBRE_SUBCAT}`, fontSize: 10, alignment: 'center' },
        { qr: product.CODIGO, alignment: 'center', fit: [150] },
        { text: `${product.CODIGO}`, fontSize: 10, alignment: 'center' },
        { text: `Q${product.PRECIO}`, fontSize: 12, bold: true, alignment: 'center' }
      ];
  
      rows.push(row);
  
      // Agrega un espacio horizontal entre conjuntos
      if ((i + 1) < product.CANTIDAD) {
        rows.push({ text: '     ', pageBreak: 'after' });
      }
    }
  
    return rows;
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
  
  

  favorito(id){
    let form = new FormData()
    form.append('id',id)
    form.append('favorito','1')
    this.servicio.post('postFavorito',form).subscribe({next:(data:any)=>{
   
        this.mensaje.add({ severity: 'success', summary: 'Success', detail: data.message });

    },
    error:(error)=>{
      console.log(error)
      this.mensaje.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
    },  
      complete:()=>{
        this.mensaje.clear()

      }

    })
  }
  
}
