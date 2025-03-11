import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSongDialogComponent } from './add-edit-song-dialog.component';

describe('AddSongDialogComponent', () => {
  let component: AddSongDialogComponent;
  let fixture: ComponentFixture<AddSongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSongDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
