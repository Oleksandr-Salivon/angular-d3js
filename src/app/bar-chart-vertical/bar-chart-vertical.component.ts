import { Component, OnInit } from '@angular/core';
// import { StatsBarChart, StatsBarChartVertical } from '../../assets/data/data';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Csv from 'd3';

@Component({
  selector: 'app-bar-chart-vertical',
  templateUrl: './bar-chart-vertical.component.html',
  styleUrls: ['./bar-chart-vertical.component.scss']
})
export class BarChartVerticalComponent implements OnInit {
  currentRate = 8;
  title = 'D3 BarchartVertical with Angular 10';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  dataTest:any;
  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }
  
  ngOnInit() {
    console.log("1");
    //
    d3Csv.csv("./assets/data/DataSet1.csv").then(data => {
      this.initSvg();
      this.initAxis(data);
      this.drawAxis();
      this.drawBars(data)
      
    });
    
  }

  initSvg() {
    this.svg = d3.select('#barChartVertical')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis(data:any) {
    console.log(data);
    
    console.log(d3Array.max(data, (d:any) => Number(d.WITHDRAWALS)));
   (data.map((d:any) =>  console.log(d.DATE)));
    
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d:any) => d.DATE));
    this.y.domain([0, d3Array.max(data, (d:any) => Number(d.WITHDRAWALS))]);

  }
 
  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');
  }

  drawBars(data:any) {

    
    this.g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d:  any) => this.x(d.DATE))
      .attr('y', (d:  any) => this.y(Number(d.WITHDRAWALS)))
      .attr('width', this.x.bandwidth())
      .attr('fill', '#498bfc')
      .attr('height', (d:  any) => this.height - this.y(Number(d.WITHDRAWALS)));
  }

  
}