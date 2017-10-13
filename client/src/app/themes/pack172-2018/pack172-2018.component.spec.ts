import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pack1722018Component } from './pack172-2018.component';

describe('Pack1722018Component', () => {
  let component: Pack1722018Component;
  let fixture: ComponentFixture<Pack1722018Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pack1722018Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pack1722018Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
