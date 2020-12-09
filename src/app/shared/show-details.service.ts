import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShowDetailsService {

  constructor(private httpClient: HttpClient) { }

  mainUrl = 'http://api.tvmaze.com/';

  // get Shows Information based on Show Id
  getSpecificShowsInfo(showId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.mainUrl}shows/${showId}?embed=cast`);
  }

  // get Tv Shows Seasons Infomation based on Show Id
  getSpecificSeasonsInfo(showId: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.mainUrl}shows/${showId}/seasons`);
  }
}
