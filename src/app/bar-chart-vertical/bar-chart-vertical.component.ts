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
  color: any;
  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }
  test(data:any){
    let userCredit ;
    userCredit = data[0].userCredit
    // console.log(Number(userCredit[0].amount.substring(1)));
    console.log(userCredit);
    return userCredit
    
  }
  ngOnInit() {
    d3Csv. json("http://127.0.0.1:8000/").then(data => {
      this.test(data)
    
      // let filteredData =  this.test(data).filter((d:any)=>Number(d.WITHDRAWALS) >0)
      // console.log( filteredData);
      this.initSvg();
      this.initAxis(this.test(data));
      this.drawAxis();
      this.drawBars(this.test(data))
      
    });

    
    // d3Csv.csv("./assets/data/ICICI_DataSet_1.csv").then(data => {
    //   console.log(data);
    //   let filteredData =  data.filter(d=>Number(d.WITHDRAWALS) >0)
    //   this.initSvg();
    //   this.initAxis(filteredData);
    //   this.drawAxis();
    //   this.drawBars(filteredData)
      
    // });
    
  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
    .range(['#FFA500', '#00FF00', '#FF0000', '#6b486b', '#FF00FF', '#d0743c', '#00FA9A']);
    this.svg = d3.select('#barChartVertical')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis(data:any) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d:any) => d.activity));
    this.y.domain([0, d3Array.max(data, (d:any) => d.amount)]);

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
      .attr('x', (d:  any) => this.x(d.activity))
      .attr('y', (d:  any) => this.y(d.amount))
      .attr('width', this.x.bandwidth())
      .attr('fill',(d: any) => this.color(d.activity) )
      .attr('height', (d:  any) => this.height - this.y(d.amount));
  }

  
}