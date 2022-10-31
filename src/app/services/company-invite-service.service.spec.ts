import { TestBed } from '@angular/core/testing';

import { CompanyInviteServiceService } from './company-invite-service.service';

describe('CompanyInviteServiceService', () => {
  let service: CompanyInviteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyInviteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
