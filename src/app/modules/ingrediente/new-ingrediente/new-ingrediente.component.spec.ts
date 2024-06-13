import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngredienteComponent } from './new-ingrediente.component';

describe('NewIngredienteComponent', () => {
  let component: NewIngredienteComponent;
  let fixture: ComponentFixture<NewIngredienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewIngredienteComponent]
    });
    fixture = TestBed.createComponent(NewIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
