import { TestBed } from '@angular/core/testing';

import { NonBlockingService } from './non-blocking.service';

describe('NonBlockingService', () => {
  let service: NonBlockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonBlockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
