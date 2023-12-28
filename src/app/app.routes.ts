import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
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
];
