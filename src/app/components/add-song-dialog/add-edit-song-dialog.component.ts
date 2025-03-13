import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from '../../models/song';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrl: './add-song-dialog.component.css',
  standalone: false,
})
export class AddEditSongDialogComponent {
  songForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditSongDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; message: string; song: Song },
    private fb: FormBuilder // Inject FormBuilder
  ) {
    this.songForm = this.fb.group({
      songTitle: ['', Validators.required],
      songArtist: ['', Validators.required],
      songReleaseDate: [null, Validators.required],
      songPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.data.song) {
      this.songForm.patchValue({
        songTitle: this.data.song.title,
        songArtist: this.data.song.artist,
        songReleaseDate: this.data.song.releaseDate,
        songPrice: this.data.song.price,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      const updatedSong: Song = {
        id: this.data.song.id,
        title: this.songForm.value.songTitle,
        artist: this.songForm.value.songArtist,
        releaseDate: this.songForm.value.songReleaseDate,
        price: this.songForm.value.songPrice,
      };
      this.dialogRef.close(updatedSong);
    }
  }
}
