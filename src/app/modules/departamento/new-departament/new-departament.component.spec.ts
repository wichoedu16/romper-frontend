import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartamentComponent } from './new-departament.component';

describe('NewDepartamentComponent', () => {
  let component: NewDepartamentComponent;
  let fixture: ComponentFixture<NewDepartamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDepartamentComponent]
    });
    fixture = TestBed.createComponent(NewDepartamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
