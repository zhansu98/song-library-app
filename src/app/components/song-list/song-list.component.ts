import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  standalone: false,
  styleUrl: './song-list.component.css'
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) { }

  ngOnInit () {
    this.getSongs();
  }

  getSongs () {
    this.songService.getSongs().subscribe(songs => this.songs = songs);
  }
}
