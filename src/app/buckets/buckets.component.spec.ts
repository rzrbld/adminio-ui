import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketsComponent } from './buckets.component';

describe('BucketsComponent', () => {
  let component: BucketsComponent;
  let fixture: ComponentFixture<BucketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
