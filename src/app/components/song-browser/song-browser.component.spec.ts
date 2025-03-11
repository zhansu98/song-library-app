import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongBrowserComponent } from './song-browser.component';

describe('SongBrowserComponent', () => {
  let component: SongBrowserComponent;
  let fixture: ComponentFixture<SongBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
