import { TestBed, inject } from '@angular/core/testing';

import { PitpassService } from './pitpass.service';

describe('PitpassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PitpassService]
    });
  });

  it('should be created', inject([PitpassService], (service: PitpassService) => {
    expect(service).toBeTruthy();
  }));
});
