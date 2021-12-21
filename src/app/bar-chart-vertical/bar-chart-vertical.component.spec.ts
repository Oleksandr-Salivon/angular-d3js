import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartVerticalComponent } from './bar-chart-vertical.component';

describe('BarChartVerticalComponent', () => {
  let component: BarChartVerticalComponent;
  let fixture: ComponentFixture<BarChartVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
