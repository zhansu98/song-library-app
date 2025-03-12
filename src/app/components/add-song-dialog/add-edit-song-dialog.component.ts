import { Component, Inject } from '@angular/core';
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
export class AddEditSongDialogComponent {
  songTitle: string;
  songArtist: string;
  songReleaseDate: Date;
  songPrice: number;
  constructor(
    public dialogRef: MatDialogRef<AddEditSongDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; song: Song }
  ) {
    this.songTitle = this.data.song.title;
    this.songArtist = this.data.song.artist;
    this.songReleaseDate = this.data.song.releaseDate;
    this.songPrice = this.data.song.price;
  }

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
}
