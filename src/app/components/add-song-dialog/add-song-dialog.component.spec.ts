import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSongDialogComponent } from './add-edit-song-dialog.component';

describe('AddSongDialogComponent', () => {
  let component: AddEditSongDialogComponent;
  let fixture: ComponentFixture<AddEditSongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSongDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditSongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
