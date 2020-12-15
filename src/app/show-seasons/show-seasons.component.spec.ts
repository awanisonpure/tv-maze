import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShowDetailsService } from '../shared/show-details.service';
import { ShowSeasonsComponent } from './show-seasons.component';

describe('ShowSeasonsComponent', () => {
  let component: ShowSeasonsComponent;
  let fixture: ComponentFixture<ShowSeasonsComponent>;
  let showDetailsService: ShowDetailsService;

  const mockActivatedRoute = {
    snapshot: { params: { id: 'showId' } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSeasonsComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ShowDetailsService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeasonsComponent);
    component = fixture.componentInstance;
    showDetailsService = TestBed.inject(ShowDetailsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
