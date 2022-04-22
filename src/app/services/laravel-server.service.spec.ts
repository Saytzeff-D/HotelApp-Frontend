import { TestBed } from '@angular/core/testing';

import { LaravelServerService } from './laravel-server.service';

describe('LaravelServerService', () => {
  let service: LaravelServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaravelServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
