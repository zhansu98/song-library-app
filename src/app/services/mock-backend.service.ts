import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class MockBackendService implements InMemoryDbService {
  createDb() {
    const songs: Song[] = [
      { id: 1, title: 'Song A', artist: 'Artist A', releaseDate: new Date('2023-01-01'), price: 1.99 },
      { id: 2, title: 'Song B', artist: 'Artist B', releaseDate: new Date('2023-02-01'), price: 2.99 },
      { id: 3, title: 'Song C', artist: 'Artist C', releaseDate: new Date('2023-03-01'), price: 3.99 },
      { id: 4, title: 'Song D', artist: 'Artist D', releaseDate: new Date('2023-04-01'), price: 4.99 },
      { id: 5, title: 'Song E', artist: 'Artist E', releaseDate: new Date('2023-05-01'), price: 5.99 }
    ];
    console.log('Mock backend database created with songs:', songs);
    return { songs };
  }
}