import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NavBarComponent } from './estaticos/nav-bar/nav-bar.component';
import { ArticulosComponent } from './estaticos/articulos/articulos.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,NavBarComponent,ArticulosComponent],
})
export class AppComponent {
  constructor() {}
}
