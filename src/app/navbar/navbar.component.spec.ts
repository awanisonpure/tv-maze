import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ShowsService } from '../shared/shows.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let showsService: ShowsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([])],
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

  it('should contian collapsed as classList for navbar toggler', () => {
    component.openCloseDiv();
    const navToggerId = document.getElementById('navbarTogglerId');
    const navToggelerClassList = navToggerId.classList;
    expect(navToggelerClassList).toContain('collapsed');
    expect(navToggelerClassList).not.toContain('collapse');
  });

  it('should contian collapse as classList for navbar toggler', () => {
    component.openCloseDiv();
    const navToggerCollapseId = document.getElementById('navbarTogglerId');
    const navToggelerClassList1 = navToggerCollapseId.classList;
    navToggelerClassList1.add('collapse');
    navToggelerClassList1.remove('collapsed');
    expect(navToggelerClassList1).toContain('collapse');
    expect(navToggelerClassList1).not.toContain('collapsed');
  });

  it('should call clearSearch to set searched value as blank', () => {
    component.searchChar = 'The Wire';
    component.clearSearch();
    expect(component.searchChar.trim()).toEqual('');
  });

});


