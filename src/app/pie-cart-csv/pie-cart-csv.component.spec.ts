import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCartCsvComponent } from './pie-cart-csv.component';

describe('PieCartCsvComponent', () => {
  let component: PieCartCsvComponent;
  let fixture: ComponentFixture<PieCartCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieCartCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieCartCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
