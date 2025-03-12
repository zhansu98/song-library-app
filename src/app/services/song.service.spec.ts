import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SongService } from './song.service';
import { Song } from '../models/song';

describe('SongService', () => {
  let service: SongService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SongService],
    });
    service = TestBed.inject(SongService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve songs', () => {
    const dummySongs: Song[] = [
      {
        id: 1,
        title: 'Song 1',
        artist: 'Artist 1',
        releaseDate: new Date('2021-01-01'),
        price: 1.99,
      },
      {
        id: 2,
        title: 'Song 2',
        artist: 'Artist 2',
        releaseDate: new Date('2021-02-01'),
        price: 2.99,
      },
    ];

    service.getSongs().subscribe((songs) => {
      expect(songs.length).toBe(2);
      expect(songs).toEqual(dummySongs);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummySongs);
  });

  it('should handle error when retrieving songs', () => {
    const errorMessage =
      'Http failure response for /api/songs: 500 Server Error';

    service.getSongs().subscribe({
      next: () => fail('Expected an error, not songs'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(
      { message: 'Error fetching songs' },
      { status: 500, statusText: 'Server Error' }
    );
  });

  it('should add a new song', () => {
    const newSong: Song = {
      id: 3,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date('2021-03-01'),
      price: 3.99,
    };

    service.addSong(newSong).subscribe((song) => {
      expect(song).toEqual(newSong);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newSong);
  });

  it('should handle error when adding a new song', () => {
    const newSong: Song = {
      id: 3,
      title: 'New Song',
      artist: 'New Artist',
      releaseDate: new Date('2021-03-01'),
      price: 3.99,
    };

    service.addSong(newSong).subscribe({
      next: (song) => {
        expect(song).toEqual(newSong);
      },
      error: () => fail('Expected the song to be added, not an error'),
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(
      { message: 'Error adding song' },
      { status: 500, statusText: 'Server Error' }
    );
  });

  it('should delete a song', () => {
    const songId = 1;

    service.deleteSong(songId).subscribe((id) => {
      expect(id).toBe(songId);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${songId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(songId);
  });

  it('should handle error when deleting a song', () => {
    const songId = 1;

    service.deleteSong(songId).subscribe({
      next: (id) => {
        expect(id).toBe(songId);
      },
      error: () => fail('Expected the song to be deleted, not an error'),
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${songId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(
      { message: 'Error deleting song' },
      { status: 500, statusText: 'Server Error' }
    );
  });

  it('should update a song', () => {
    const updatedSong: Song = {
      id: 1,
      title: 'Updated Song',
      artist: 'Updated Artist',
      releaseDate: new Date('2021-04-01'),
      price: 4.99,
    };

    service.updateSong(updatedSong).subscribe((song) => {
      expect(song).toEqual(updatedSong);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${updatedSong.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSong);
  });

  it('should handle error when updating a song', () => {
    const updatedSong: Song = {
      id: 1,
      title: 'Updated Song',
      artist: 'Updated Artist',
      releaseDate: new Date('2021-04-01'),
      price: 4.99,
    };

    service.updateSong(updatedSong).subscribe({
      next: (song) => {
        expect(song).toEqual(updatedSong);
      },
      error: () => fail('Expected the song to be updated, not an error'),
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${updatedSong.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(
      { message: 'Error updating song' },
      { status: 500, statusText: 'Server Error' }
    );
  });
});
