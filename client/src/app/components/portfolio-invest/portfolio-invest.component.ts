import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-portfolio-invest',
  templateUrl: './portfolio-invest.component.html',
  styleUrls: ['./portfolio-invest.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioInvestComponent implements OnInit {
  // stock data
  vtmxStockData: any = null;
  vtmxBondData: any = null;
  stashAwayData: any = null;

  benchmarkValue: string = null;
  dateFilterValue: string = '5';
  benchmarkList: any = [
    {
      name: '60/40 portfolio',
      value: '60_40_portfolio'
    },
    {
      name: '20/80 portfolio',
      value: '20_80_portfolio'
    }
  ];
  dateFilter: number = 0;

  chartData: any[];

  // options
  legend: boolean = true;
  legendTitle: string = '';
  legendPosition: string = 'below'
  showGridLines: boolean = true;
  autoScale: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  timeline: boolean = false;

  colorScheme = {
    domain: ['#304FFE', '#FFAB00', '#a8385d', '#aae3f5']
  };
  xAxisTickFormatting: any;

  constructor(private datePipe: DatePipe, private httpService: HttpService) {
  }

  ngOnInit() {
    // set default data
    this.xAxisTickFormatting = function (val: any): string {
      if (val) {
        const date = this.datePipe.transform(new Date(val), 'MMM yy');
        return date;
      }
    }.bind(this);

    this.getStashAwayStockPrice();
  }

  getStashAwayStockPrice() {
    if (this.stashAwayData) return;

    this.httpService.getData('stash-away-stock').subscribe(res => {
      this.stashAwayData = res;
      this.chartData = [res];
    });
  }

  getVtmxStockPrice(portfolioType: string) {
    if (this.vtmxStockData) {
      this.chartData = this.filterDataByBenchmark(portfolioType);
      return;
    }

    this.httpService.getData('vtsmx-stock').subscribe(res => {
      this.vtmxStockData = res;
      this.chartData = this.filterDataByBenchmark(portfolioType);
    });
  }

  getVtmxBondPrice(portfolioType: string) {
    if (this.vtmxBondData) {
      this.chartData = this.filterDataByBenchmark(portfolioType);
      return;
    }

    this.httpService.getData('vtsmx-bond').subscribe(res => {
      this.vtmxBondData = res;
      this.chartData = this.filterDataByBenchmark(portfolioType);
    });
  }

  onBenchmarkChange(value: string) {
    // reset date to max
    this.dateFilterValue = '5';
    if (value === '60_40_portfolio') {
      this.getVtmxStockPrice(value);
    } else if (value === '20_80_portfolio') {
      this.getVtmxBondPrice(value);
    }
  }

  onDateFilterChange(val: string) {
    this.dateFilterValue = val;
    const value = +val;
    let days = 0;
    if (value == 0) {
      // Show for 1 month
      days = 30;
    } else if (value == 1) {
      // 6 months
      days = 6 * 30
    } else if (value == 2) {
      // 1 year
      days = 12 * 30
    } else if (value == 3) {
      // 3 years
      days = 12 * 3 * 30
    } else if (value == 4) {
      // 5 years
      days = 12 * 3 * 30
    } else if (value == 5) {
      // 6 months
      days = this.stashAwayData.series.length;
    }
    const data = this.filterDataByBenchmark(this.benchmarkValue);
    this.chartData = Object.assign(this.filterDataByDays(days, data[0], data[1]));
  }

  filterDataByBenchmark(value) {
    if (value === '60_40_portfolio') {
      return [this.stashAwayData, this.vtmxStockData];
    } else if (value === '20_80_portfolio') {
      return [this.stashAwayData, this.vtmxBondData];
    } else {
      return [this.stashAwayData];
    }
  }

  filterDataByDays(days: number, firstData: any, secondData?: any) {
    try {
      const data = [
        {
          name: firstData.name,
          series: firstData.series.slice(firstData.series.length - days)
        }
      ];
      if (secondData) {
        data.push({
          name: secondData.name,
          series: secondData.series.slice(secondData.series.length - days)
        })
      }
      console.log(data)
      return data;
    } catch (error) {
      return [];
    }

  }

  onSelect(data): void {

    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
