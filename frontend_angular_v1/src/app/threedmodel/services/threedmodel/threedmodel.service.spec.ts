import { TestBed } from '@angular/core/testing';

import { ThreedmodelService } from './threedmodel.service';

describe('ThreedmodelService', () => {
  let service: ThreedmodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreedmodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
