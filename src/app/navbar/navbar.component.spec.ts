import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ShowsService } from '../shared/shows.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let showsService: ShowsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [ShowsService]
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    showsService = TestBed.inject(ShowsService);
    fixture.detectChanges();
  });

  it('should create Navbar Component', () => {
    expect(component).toBeTruthy();
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

  it('should call empty search term to set searched value as blank', () => {
    component.searchChar = 'The Wire';
    component.emptySearchedTerm();
    expect(component.searchChar.trim()).toEqual('');
  });
});


