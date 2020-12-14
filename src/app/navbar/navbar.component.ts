import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsService } from '../shared/shows.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private showsService: ShowsService, private router: Router) { }

  title = 'TVMaze';
  searchChar = '';
  inputField: string;

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
    if (event.keyCode === 13) { 
      this.search(); 
    }   
  }

  // set the searched key value to be fetched in dashboard page
  search(): void {
    return this.showsService.setSearchVal(this.searchChar);
  }

  // clearing input field
  clearSearch(){
    this.searchChar = '';
  }

}




