import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Csv from 'd3';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  currentRate = 8;
  title = 'D3 Barchart with Angular 10';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  color: any;
  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

 

  convertDataToRecords(data: any) {
    console.log(data);
    this.title = `Analytic ${data[0].userName} spending`;
    let userCredit = data[0].userCredit;
    // let filtArr:any = [];
    var result:any = [];
    userCredit.reduce(function(res:any, value:any) {
      if (!res[value.activity]) {
        res[value.activity] = { activity: value.activity, amount: 0 };
        result.push(res[value.activity])
      }
      res[value.activity].amount += value.amount;
      return res;
    }, {});
    
    console.log(userCredit);
    
    console.log(result)







    // userCredit.forEach((element:any, ) => {
    //   let objectt = {activity:'', amount:0};
    //     objectt["activity"] = element.activity
    //     objectt["amount"] = element.amount
    //     filtArr.push(objectt)
    //     console.log(filtArr);
        
    //   });
    //   console.log(filtArr);

    // console.log(userCredit);
    return result;
  }
  ngOnInit() {
    d3Csv.json('http://127.0.0.1:8000/').then((data) => {
      let convertedData = this.convertDataToRecords(data);
console.log(convertedData);

      this.initSvg();
      this.initAxis(convertedData);
      this.drawAxis();
      this.drawBars(convertedData);
    });
  }

  initSvg() {
    this.color = d3Scale
      .scaleOrdinal()
      .range([
        '#FFA500',
        '#00FF00',
        '#FF0000',
        '#6b486b',
        '#FF00FF',
        '#d0743c',
        '#00FA9A',
      ]);
    this.svg = d3
      .select('#barChartVertical')
      .append('svg')
      .attr('width', '140%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  initAxis(data: any) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width+70]).padding(0.2);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d: any) => d.activity));
    this.y.domain([0, d3Array.max(data, (d: any) => d.amount)]);
  }

  drawAxis() {
    this.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('text-anchor', 'middle');
    this.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .attr('font-size', '18px')
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Amount')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('fill', 'black');
  }

  drawBars(data: any) {
    const bar = this.g
      .selectAll('.bar')
      .data(data)
      .enter();


    bar.append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.x(d.activity))
      .attr('y', (d: any) => this.y(d.amount))
      .attr('width', this.x.bandwidth())
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('opacity', '0.5')
      .attr('fill', (d: any) => this.color(d.activity))
      .attr('height', (d: any) => this.height - this.y(d.amount));

    bar
      .append('text')
      .attr("class", "up")
      .attr('x', (d: any) => this.x(d.activity))
      .attr('y', (d: any) => this.y(d.amount))
      .attr('dy', '-2.35em')
      .attr('dx', '2em')
      .attr('font-size', '18px')
      .attr('fill', 'black')
      .style('font-weight', 'bold')
      .attr("text-anchor", "start")
      .text((d: any) => `$${d.amount}`);
  }

}