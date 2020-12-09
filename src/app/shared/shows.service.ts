import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShowsService {

  searchedKey = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  mainUrl = 'http://api.tvmaze.com/';
  
  // get list of All Shows 
  getAllShowsList(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.mainUrl}shows`);
  }

  // get searched Show 
  searchShows(searchChar): Observable<any> {
    return this.httpClient.get<any[]>(`${this.mainUrl}search/shows?q=${searchChar}`);
  }

  // set the search value
  setSearchVal(message: string): any {
    this.searchedKey.next(message);
  }

  // get the search value
  getSearchVal(): Observable<any> {
    return this.searchedKey.asObservable();
  }
}
