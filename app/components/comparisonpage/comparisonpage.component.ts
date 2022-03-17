import { Component, OnInit, Input } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import {Coin} from "src/app/models/coin.model";

@Component({
  selector: 'app-comparisonpage',
  templateUrl: './comparisonpage.component.html',
  styleUrls: ['./comparisonpage.component.css']
})

export class ComparisonpageComponent implements OnInit {

  public coin: Coin;
  public coins: Coin[];
  public results;
  public series;
  public pair;
  public index: number;

  multi;
  view: any[] = [700, 300];
  //public view;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;


  colorScheme = {
    domain: ['cyan']
  };


  constructor(private coinService: CoinService) { }

  ngOnInit(): void {
    this.coins = [];
    this.series = [];
    this.pair = {};
    this.index = 0;
    this.results = [];
  }
  receiveCoins($event){
    this.coins.push($event);

    this.buildResults($event);
  }

  buildResults(coin: Coin){ 
    this.series = [];
    for (var price in coin.changes) {
      this.pair = { "value": coin.changes[this.index], "name": this.index}
      this.series.push(this.pair);
      this.index++;
    }
    this.index = 0;
    
    this.results.push({
      "name" : coin.symbol,
      "series": this.series
    }); 
    console.log(this.results[0])
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
