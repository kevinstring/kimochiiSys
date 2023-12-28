import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-generator',
  template: `
    <button (click)="generatePDF()">Generar PDF</button>
  `,
  standalone: true,
  styles: []
})
export class PdfGeneratorComponent {
  generatePDF() {
    const documentDefinition = {
      content: [
        '¡Hola, este es un PDF generado con pdfmake!',
        { text: 'Este es un subtítulo', fontSize: 16 },
        {
          ul: [
            'Item 1',
            'Item 2',
            'Item 3',
          ]
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).open();
  }
  
}
