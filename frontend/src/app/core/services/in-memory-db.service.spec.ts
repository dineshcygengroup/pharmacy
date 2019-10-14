import { TestBed } from '@angular/core/testing';

import { InMemoryDbService } from './in-memory-db.service';

describe('InMemoryDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryDbService = TestBed.get(InMemoryDbService);
    expect(service).toBeTruthy();
  });
});
