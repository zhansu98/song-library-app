import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiURL = "api/songs"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.apiURL).pipe(
      tap(songs => {
        console.log('fetched songs', songs);
      }),
      catchError(this.handleError<Song[]>('getSongs', []))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
