import { Routes } from '@angular/router';
import { AuthGuard } from './authguards.guard';

export const routes: Routes = [



  {path:'',redirectTo:'home',pathMatch:'full' },


  {
    path: 'home',
    // loadComponent:()=>import('./registro-compras/registro-compras.component').then((m)=>m.RegistroComprasComponent)

    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate:[AuthGuard]
  },



  {
    path:'compras',
    loadComponent:()=>import('./registro-compras/registro-compras.component').then((m)=>m.RegistroComprasComponent),
    canActivate:[AuthGuard]
  },
  //registrar Venta
  {
    path:'ventas',
    loadComponent:()=>import('./registrar-venta/registrar-venta.component').then((m)=>m.RegistrarVentaComponent),
    canActivate:[AuthGuard]
  },
  {
  path:'verVentas',
  loadComponent:()=>import('./ver-ventas/ver-ventas.component').then((m)=>m.VerVentasComponent),
  canActivate:[AuthGuard]
},
{
  path:'pedidos',
  loadComponent:()=>import('./pedidos/pedidos.component').then((m)=>m.PedidosComponent),
  canActivate:[AuthGuard]
}

,{
  path:'login',
  loadComponent:()=>import('./login/login.component').then((m)=>m.LoginComponent)
},
{
  path:'descuentos',
  loadComponent:()=>import('./descuentos/descuentos.component').then((m)=>m.DescuentosComponent),
},
{
  path:'gastos',
  loadComponent:()=>import('./gastos/gastos.component').then((m)=>m.GastosComponent),
}
,
{
  path:'vertallas',
  loadComponent() {
      return import('./vista-ropa/vista-ropa.component').then(m => m.VistaRopaComponent);
  },
}

];
