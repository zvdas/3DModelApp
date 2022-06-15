import { TestBed } from '@angular/core/testing';

import { ModelcrService } from './modelcr.service';

describe('ModelcrService', () => {
  let service: ModelcrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelcrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
