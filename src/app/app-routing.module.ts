import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartVerticalComponent } from './bar-chart-vertical/bar-chart-vertical.component';
import { PieCartCsvComponent } from './pie-cart-csv/pie-cart-csv.component';

const routes: Routes = [
  { path: '', component: BarChartComponent },
  { path: 'barChart', component: BarChartComponent },
  { path: 'barChartVertical', component: BarChartVerticalComponent },
  { path: 'pieChart', component: PieChartComponent },
  { path: 'pieChartCsv', component: PieCartCsvComponent }
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
