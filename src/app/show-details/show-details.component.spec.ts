import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ShowDetailsService } from '../shared/show-details.service';
import { ShowDetailsComponent } from './show-details.component';
import { of } from 'rxjs';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;
  let showDetailsService: ShowDetailsService;

  const mockActivatedRoute = {
    snapshot: { params: { id: 'showId' } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ShowDetailsService],
    }).compileComponents();
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    showDetailsService = TestBed.inject(ShowDetailsService);
    fixture.detectChanges();
  });

  it('should create Show Details Component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSpecificShowsInfo and return list of showDetails', fakeAsync(() => {
    component.selectedShowId = 1;
    const response: object = {
      id: 180, url: 'http://www.tvmaze.com/shows/180/firefly', name: 'Firefly',
      type: 'Scripted', language: 'English', genres: ['Drama', 'Adventure', 'Science-Fiction'],
      status: 'Ended', runtime: 60, premiered: '2002-09-20', officialSite: null,
      schedule: { time: '20:00', days: ['Friday'] }, rating: { average: 9.2 },
      weight: 92, network: {
        id: 4, name: 'FOX',
        country: { name: 'United States', code: 'US', timezone: 'America/New_York' }
      },
      webChannel: null, externals: { tvrage: 3548, thetvdb: 78874, imdb: 'tt0303461' },
      image: {
        medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/1/2600.jpg',
        original: 'http://static.tvmaze.com/uploads/images/original_untouched/1/2600.jpg'
      },
      summary: '<p>Five hundred years in the future, a renegade crew aboard a small spacecraft tries to survive as they travel the unknown parts of the galaxy and evade warring factions as well as authority agents out to get them.</p>',
      updated: 1591835730, _links: {
        self: { href: 'http://api.tvmaze.com/shows/180' }, previousepisode:
          { href: 'http://api.tvmaze.com/episodes/13005' }
      }, _embedded: {
        cast: []
      }
    };
    spyOn(showDetailsService, 'getSpecificShowsInfo').withArgs(component.selectedShowId).and.returnValue(of(response));
    component.loadShowsData();
    expect(component.showDetails).toEqual(response);
  }));

  it('should set summary value for summary key not found in response', () => {
    component.showDetails = { id: 800 };
    component.removeSemanticTagsFromSummary();
    expect(component.showDetails.summary.trim()).toEqual('Summary Is unavailable.');
  });

});


