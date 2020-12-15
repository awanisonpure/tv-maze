import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ShowsComponent } from './shows.component';
import { ShowsService } from '../shared/shows.service';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;
  let showsService: ShowsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsComponent ],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [ShowsService],
    })
    .compileComponents();
    fixture = TestBed.createComponent(ShowsComponent);
    component = fixture.componentInstance;
    showsService = TestBed.inject(ShowsService);
    fixture.detectChanges();
  });

  it('should create Shows Component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllShowsList and return allShowsList', fakeAsync(() => {
    const response: any =
      [{
        id: 1,
        url: 'http://www.tvmaze.com/shows/1/under-the-dome',
        name: 'Under the Dome',
        type: 'Scripted',
        language: 'English',
        genres: [
          'Drama',
          'Science-Fiction',
          'Thriller'
        ],
        status: 'Ended',
        runtime: 60,
        premiered: '2013-06-24',
        officialSite: 'http://www.cbs.com/shows/under-the-dome/',
        schedule: {
          time: '22:00',
          days: [
            'Thursday'
          ]
        },
        rating: {
          average: 6.5
        },
        weight: 97,
        network: {
          id: 2,
          name: 'CBS',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York'
          }
        },
        webChannel: null,
        externals: {
          tvrage: 25988,
          thetvdb: 264492,
          imdb: 'tt1553656'
        },
        image: {
          medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
          original: 'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
        },
        summary: '<p><b>Under the Dome</b> is the story of a small town that is suddenly.',
        updated: 1573667713,
        _links: {
          self: {
            href: 'http://api.tvmaze.com/shows/1'
          },
          previousepisode: {
            href: 'http://api.tvmaze.com/episodes/185054'
          }
        }
      }];
    spyOn(showsService, 'getAllShowsList').and.returnValue(of(response));
    component.showTvShowsList();
    expect(component.allShowsList).toEqual(response);
  }));

  it('should call searchResults and return list of searchShows', fakeAsync(() => {
    component.searchChar = 'Break';
    const searchResults = [
      {
        score: 17.854973,
        show: {
          id: 541,
          url: 'http://www.tvmaze.com/shows/541/prison-break',
          name: 'Prison Break',
          type: 'Scripted',
          language: 'English',
          genres: [
            'Drama',
            'Crime',
            'Thriller'
          ],
          status: 'Ended',
          runtime: 60,
          premiered: '2005-08-29',
          officialSite: 'http://www.fox.com/prisonbreak',
          schedule: {
            time: '21:00',
            days: [
              'Tuesday'
            ]
          },
          rating: {
            average: 8.3
          },
          weight: 93,
          network: {
            id: 4,
            name: 'FOX',
            country: {
              name: 'United States',
              code: 'US',
              timezone: 'America/New_York'
            }
          },
          webChannel: null,
          externals: {
            tvrage: 4895,
            thetvdb: 360115,
            imdb: 'tt0455275'
          },
          image: {
            medium: 'http://static.tvmaze.com/uploads/images/medium_portrait/104/261034.jpg',
            original: 'http://static.tvmaze.com/uploads/images/original_untouched/104/261034.jpg'
          },
          summary: '',
          updated: 1579031884,
          _links: {
            self: {
              href: 'http://api.tvmaze.com/shows/541'
            },
            previousepisode: {
              href: 'http://api.tvmaze.com/episodes/1107655'
            }
          }
        }
      }
    ];
    spyOn(showsService, 'searchShows').withArgs(component.searchChar).and.returnValue(of(searchResults));
    component.searchResults();
    expect(component.searchCharShows).toEqual(searchResults);
    expect(component.isSearched).toEqual(true);
    expect(component.loadData).toEqual(true);
  }));

  it('should sort average rating in descending order', () => {
    const data = [{ rating: { average: 2 } }, { rating: { average: 9 } }, { rating: { average: 5 } }, { rating: { average: 8 } }];
    component.sortByRating(data);
    const sortedOutput = [{ rating: { average: 9 } }, { rating: { average: 8 } }, { rating: { average: 5 } }, { rating: { average: 2 } }];
    expect(data).toEqual(sortedOutput);
  });

  it('should set searched TV Show Value', () => {
    const event = { target: { value: 'Thrones' }, keyCode: 34 };
    fixture.componentInstance.valueSearched(event);
    expect(fixture.componentInstance.searchChar).toEqual('Thrones');
  });

  it('should set searched TV Show Value', () => {
    const event = { target: { value: 'Thrones' }, keyCode: 13 };
    fixture.componentInstance.valueSearched(event);
    expect(fixture.componentInstance.searchChar).toEqual('Thrones');
  });

});


