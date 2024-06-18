import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVentaComponent } from './new-venta.component';

describe('NewVentaComponent', () => {
  let component: NewVentaComponent;
  let fixture: ComponentFixture<NewVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewVentaComponent]
    });
    fixture = TestBed.createComponent(NewVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
