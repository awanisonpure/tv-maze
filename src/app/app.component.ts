import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tv-Maze';
  searchChar = '';


  clearSearch(): void {
    this.searchChar = '';
  }
}
