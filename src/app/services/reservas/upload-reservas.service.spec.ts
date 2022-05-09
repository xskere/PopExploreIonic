import { TestBed } from '@angular/core/testing';

import { UploadReservasService } from './upload-reservas.service';

describe('UploadReservasService', () => {
  let service: UploadReservasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadReservasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
