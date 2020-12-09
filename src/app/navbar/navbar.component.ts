import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsService } from '../shared/shows.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private showsService: ShowsService, private router: Router) { }

  title = 'TV Maze';
  searchChar = '';
  showScrollTopBtn: boolean;
  topPositionToShowScrollBtn = 100;
  scrollPosition;

  ngOnInit(): void {
  }

  // show/hide toggler based on device width
  openCloseDiv(): void {
    const collapsibleDiv = document.getElementById('navbarTogglerId');
    if (collapsibleDiv.classList.contains('collapse')) {
      collapsibleDiv.classList.remove('collapse');
      collapsibleDiv.classList.add('collapsed');
    } else {
      collapsibleDiv.classList.add('collapse');
      collapsibleDiv.classList.remove('collapsed');
    }
  }

  // fetch searched value from input box
  valueSearched(event: { target: { value: string; }; keyCode: number; }): void {
    this.searchChar = event.target.value;
    if (event.keyCode === 13) { this.search(); }
  }

  // set the searched key value to be fetched in dashboard page
  search(): void {
    const pathName = window.location.pathname;
    if (pathName === '/') {
      this.showsService.setSearchVal(this.searchChar);
    } else {
      this.router.navigate(['']);
      setTimeout(() => this.showsService.setSearchVal(this.searchChar), 100);
    }
  }

}




