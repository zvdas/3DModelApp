import { TestBed } from '@angular/core/testing';

import { AuthFirestoreService } from './auth-firestore.service';

describe('AuthFirestoreService', () => {
  let service: AuthFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
