import { TestBed } from '@angular/core/testing';

import { EmpleadoService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmpleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
