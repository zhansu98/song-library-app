import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongFilterComponent } from './song-filter.component';

describe('SongFilterComponent', () => {
  let component: SongFilterComponent;
  let fixture: ComponentFixture<SongFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
