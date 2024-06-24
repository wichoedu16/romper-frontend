import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInventarioComponent } from './new-inventario.component';

describe('NewInventarioComponent', () => {
  let component: NewInventarioComponent;
  let fixture: ComponentFixture<NewInventarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInventarioComponent]
    });
    fixture = TestBed.createComponent(NewInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
