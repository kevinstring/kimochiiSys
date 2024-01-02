import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent:()=>import('./registro-compras/registro-compras.component').then((m)=>m.RegistroComprasComponent)

    // loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'pdf',
    loadComponent:()=>import('./pdf-generator-component/pdf-generator-component.component').then((m)=>m.PdfGeneratorComponent)
  }
  ,
  {
    path:'compras',
    loadComponent:()=>import('./registro-compras/registro-compras.component').then((m)=>m.RegistroComprasComponent)
  },
  //registrar Venta
  {
    path:'ventas',
    loadComponent:()=>import('./registrar-venta/registrar-venta.component').then((m)=>m.RegistrarVentaComponent)
  }

];
