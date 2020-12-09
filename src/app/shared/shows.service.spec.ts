import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShowsService } from './shows.service';

describe('ShowsService', () => {
  let service: ShowsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ShowsService
      ]
    });
    service = TestBed.inject(ShowsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created as Shows Service File', () => {
    expect(service).toBeTruthy();
  });

  it('should call setSearchVal to set searchedKey value', () => {
    service.searchedKey.subscribe((message) => {
      expect(message).toBe('Thrones');
    });
    service.setSearchVal('Thrones');
  });
});


