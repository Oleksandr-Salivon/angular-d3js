import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartVerticalComponent } from './bar-chart-vertical/bar-chart-vertical.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PieCartCsvComponent } from './pie-cart-csv/pie-cart-csv.component';
@NgModule({
  declarations: [
    AppComponent,
    BarChartVerticalComponent,
    BarChartComponent,
    PieChartComponent,
    PieCartCsvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
