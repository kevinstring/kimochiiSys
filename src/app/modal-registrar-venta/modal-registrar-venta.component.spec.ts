import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRegistrarVentaComponent } from './modal-registrar-venta.component';

describe('ModalRegistrarVentaComponent', () => {
  let component: ModalRegistrarVentaComponent;
  let fixture: ComponentFixture<ModalRegistrarVentaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistrarVentaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRegistrarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
