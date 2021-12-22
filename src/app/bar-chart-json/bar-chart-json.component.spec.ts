import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartJsonComponent } from './bar-chart-json.component';

describe('BarChartJsonComponent', () => {
  let component: BarChartJsonComponent;
  let fixture: ComponentFixture<BarChartJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
