import { TestBed } from '@angular/core/testing';

import { CanActivateRoleService } from './can-activate-role.service';

describe('CanActivateRoleService', () => {
  let service: CanActivateRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
