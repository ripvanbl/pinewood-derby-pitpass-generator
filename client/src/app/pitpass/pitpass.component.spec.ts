import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitpassComponent } from './pitpass.component';

describe('PitpassComponent', () => {
  let component: PitpassComponent;
  let fixture: ComponentFixture<PitpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
