import { TestBed } from '@angular/core/testing';

import { ScrollingDirectionService } from './scrolling-direction.service';

describe('ScrollingDirectionService', () => {
  let service: ScrollingDirectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollingDirectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
