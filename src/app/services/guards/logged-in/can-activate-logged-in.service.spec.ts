import { TestBed } from '@angular/core/testing';

import { CanActivateLoggedInService } from './can-activate-logged-in.service';

describe('CanActivateLoggedInService', () => {
  let service: CanActivateLoggedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateLoggedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
