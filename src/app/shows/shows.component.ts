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
  size = 24;

  ngOnInit(): void {
    this.getSearchVal();
    this.showTvShowsList();
  }

  // get list of all tv shows fetched
  showTvShowsList(): void {
    this.showsService.getAllShowsList().subscribe(data => {
      this.allShowsList = data;
      this.getGenreList();
    });
  }

  // create list of all genres available in allShowsList
  getGenreList(): void {
    this.allShowsList.forEach((element: { genres: any; }) => {
      this.allGenreList = this.allGenreList.concat(element.genres);
    });
    // removing duplicate values from allGenreList
    this.uniqueGenreList = ['Popular Shows'].concat(this.allGenreList.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) === index;
    }));
    // console.log("list : "+this.uniqueGenreList);
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
        genreBasedShows.genreData = this.reverseRating(genreBasedShows.genreData);
      } else {
        genreBasedShows.genreData = this.allShowsList;
        genreBasedShows.genreData = this.reverseRating(genreBasedShows.genreData);
        genreBasedShows.genreData = genreBasedShows.genreData.slice(0, this.size);
      }
      this.selectedGenreList.push(genreBasedShows);
    });
    this.loadData = true;
  }

  // sort genre data based on average rating in descending order
  reverseRating(data: any[]): any {
    data.sort((value1: { rating: { average: number; }; }, value2: { rating: { average: number; }; }) => 
         (value1.rating.average > value2.rating.average) ? 1 : -1);
    data = data.reverse();
    return data;
  }
  
  // getting search value based on search key
  getSearchVal(): any{
    this.showsService.getSearchVal().subscribe(value => {
      this.searchChar = value;
      this.triggerSearch();
    });
  }

  // identifies if search api needs to be called or not
  triggerSearch(): void {
    this.loadData = false;
    if (this.searchChar.trim() === null || this.searchChar.trim() === '' || this.searchChar === undefined) {
      this.isSearched = false;
      setTimeout(() => this.loadData = true, 500);
    } else {
      this.searchResults();
    }
  }

  // get search results based on search value
  searchResults(): void {
    this.showsService.searchShows(this.searchChar).subscribe(data => {
      this.searchCharShows = data;
      this.isSearched = true;
      this.loadData = true;
    });
  }
}
