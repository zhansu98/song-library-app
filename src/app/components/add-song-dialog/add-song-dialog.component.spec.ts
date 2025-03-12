import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSongDialogComponent } from './add-edit-song-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

describe('AddSongDialogComponent', () => {
  let component: AddEditSongDialogComponent;
  let fixture: ComponentFixture<AddEditSongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditSongDialogComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        FormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            song: { title: '', artist: '', releaseDate: new Date(), price: 0 },
          },
        },
        provideNativeDateAdapter(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditSongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
