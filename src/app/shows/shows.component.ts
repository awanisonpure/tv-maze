import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shared/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})

export class ShowsComponent implements OnInit {

  constructor(private showsService: ShowsService) { }

  allShowsList: any = [];
  allGenreList: any = [];
  uniqueGenreList: any = [];
  selectedGenreList: any = [];
  loadData = false;
  searchChar: string;
  searchCharShows: any = [];
  isSearched = false;
  size: number = 24;

  ngOnInit(): void {
    this.searchChar = '';
    this.getSearchVal();
    this.showTvShowsList();
  }

  // get list of all tv shows fetched
  showTvShowsList(): void {
    this.showsService.getAllShowsList().subscribe(data => {
      this.allShowsList = data;
      this.setGenreList();
    });
  }

  // create list of all genres available in allShowsList
  setGenreList(): void {
    this.allShowsList.forEach((element: { genres: any; }) => {
      this.allGenreList = this.allGenreList.concat(element.genres);
    });
    // removing duplicate values from allGenreList
    this.uniqueGenreList = ['Popular Shows'].concat(this.allGenreList.filter(function (item, index, inputArray) {
      return inputArray.indexOf(item) === index;
    }));
    this.genreBasedShows();
  }

  // cretae genre and respective genre data dynamically
  genreBasedShows(): void {
    this.uniqueGenreList.forEach((genre: string) => {
      const genreBasedShows = {
        genreVal: genre,
        genreData: []
      };
      if (genre !== 'Popular Shows') {
        genreBasedShows.genreData = this.allShowsList.filter((data: { genres: any[]; }) => data.genres.includes(genre));
        genreBasedShows.genreData = this.sortByRating(genreBasedShows.genreData);
      } else {
        genreBasedShows.genreData = this.allShowsList;
        genreBasedShows.genreData = this.sortByRating(genreBasedShows.genreData);
        genreBasedShows.genreData = genreBasedShows.genreData.slice(0, this.size);
      }
      this.selectedGenreList.push(genreBasedShows);
    });
    this.loadData = true;
  }

  // sort genre data based on average rating in descending order
  sortByRating(data: any[]): any {
    data.sort((value1: { rating: { average: number; }; }, value2: { rating: { average: number; }; }) =>
      (value1.rating.average > value2.rating.average) ? -1 : 1);
    return data;
  }

  // getting search value based on search key
  getSearchVal(): any {
    this.showsService.getSearchVal().subscribe(value => {
      this.searchChar = value;
      this.searchResults();
    });
  }

  // get search results based on search value
  searchResults(): void {
    this.showsService.searchShows(this.searchChar).subscribe(data => {
      this.searchCharShows = data;
      this.isSearched = true;
      this.loadData = true;
    });
  }

  // fetch searched value from input box
  valueSearched(event: { target: { value: string; }; keyCode: number; }): void {
    this.searchChar = event.target.value;
    if (event.keyCode === 13) {
      this.search();
    }
  }

  // set the searched key value to be fetched in home page
  search(): void {
    return this.showsService.setSearchVal(this.searchChar);
  }

  // clearing input field
  clearSearch(): void {
    this.searchChar = '';
  }

}
