import { TestBed } from '@angular/core/testing';

import { ThreedmodelFirestoreService } from './threedmodel-firestore.service';

describe('ThreedmodelFirestoreService', () => {
  let service: ThreedmodelFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreedmodelFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
