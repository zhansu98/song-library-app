import { Component, inject, model } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../../models/song';

export interface addSongDialogData {
  song: Song;
}

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrl: './add-song-dialog.component.css',
  standalone: false,
})
export class AddSongDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddSongDialogComponent>);
  readonly data = inject<addSongDialogData>(MAT_DIALOG_DATA);

  songTitle: string = this.data.song.title;
  songArtist: string = this.data.song.artist;
  songReleaseDate: Date = this.data.song.releaseDate;
  songPrice: number = this.data.song.price;

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updatedSong: Song = {
      id: this.data.song.id,
      title: this.songTitle,
      artist: this.songArtist,
      releaseDate: this.songReleaseDate,
      price: this.songPrice,
    };
    this.dialogRef.close(updatedSong);
  }

  constructor() {}
}
