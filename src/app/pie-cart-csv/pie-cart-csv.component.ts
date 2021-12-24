import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Csv from 'd3';

@Component({
  selector: 'app-pie-cart-csv',
  templateUrl: './pie-cart-csv.component.html',
  styleUrls: ['./pie-cart-csv.component.scss'],
})
export class PieCartCsvComponent implements OnInit {
  title = 'D3 Pie Chart in Angular 10';

  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  convertDataToRecords(data: any) {
    console.log(data);
    this.title = `Analytic ${data[0].userName} spending`;
    let userCredit = data[0].userCredit;
    // let filtArr:any = [];
    var result:any = [];
    userCredit.reduce(function(res:any, value:any) {
      if (!res[value.activity]) {
        res[value.activity] = { Id: value.activity, amount: 0 };
        result.push(res[value.activity])
      }
      res[value.activity].amount += value.amount;
      return res;
    }, {});
    
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
    return userCredit;
  }



  ngOnInit() {
    d3Csv.json('http://127.0.0.1:8000/').then((data) => {
      this.initSvg();
      this.drawPie(this.convertDataToRecords(data));
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
    this.arc = d3Shape
      .arc()
      .outerRadius(this.radius - 70)
      .innerRadius(5);
    this.labelArc = d3Shape
      .arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer = d3Shape
      .arc()
      .outerRadius(this.radius - 80)
      .innerRadius(this.radius - 80);

    this.pie = d3Shape
      .pie()
      .sort(null)
      .value((d: any) => Number(d.amount));

    this.svg = d3
      .select('#pieChartCsv')
      .append('svg')
      .classed('test', true)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('class', 'test')
      .attr(
        'viewBox',
        '0 0 ' +
          Math.min(this.width, this.height) +
          ' ' +
          Math.min(this.width, this.height)
      )
      .append('g')
      .attr(
        'transform',
        'translate(' +
          Math.min(this.width, this.height) / 2 +
          ',' +
          Math.min(this.width, this.height) / 2 +
          ')'
      );
  }

  drawPie(data: any) {
    console.log(data);

    const g = this.svg
      .selectAll('.arc')
      .data(this.pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
    g.append('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.activity))
      .attr('opacity', '0.5')
    g.append('text')
      .attr(
        'transform',
        (d: any) => 'translate(' + this.labelArc.centroid(d) + ')'
      )
      .attr('dy', '0.35em')
      .attr('dx', '-4.35em')
      .style('font-weight', 'bold')
      .style('z-index', '5')
      .text((d: any) => d.data.activity);

    g.append('text')
      .attr(
        'transform',
        (d: any) => 'translate(' + this.labelPer.centroid(d) + ')'
      )
      .attr('dy', '.25em')
      .text((d: any) => '$' + Number(d.data.amount))
      .style('font-weight', 'bold')
      .style('z-index', '5');
  }
}
