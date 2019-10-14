import { TestBed } from '@angular/core/testing';

import { HttpRequestHandlerService } from './http-request-handler.service';

describe('HttpRequestHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpRequestHandlerService = TestBed.get(HttpRequestHandlerService);
    expect(service).toBeTruthy();
  });
});
