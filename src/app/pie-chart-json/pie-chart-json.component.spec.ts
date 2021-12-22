import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartJsonComponent } from './pie-chart-json.component';

describe('PieChartJsonComponent', () => {
  let component: PieChartJsonComponent;
  let fixture: ComponentFixture<PieChartJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
