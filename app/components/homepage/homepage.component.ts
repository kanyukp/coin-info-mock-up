import { Component, OnInit } from '@angular/core';
import { multi } from '../../data';
import {Coin} from "../../models/coin.model"
import { Coin2 } from '../../models/coin2.model';
import { CoinService } from '../../services/coin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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

  public coin: Coin;
  public coins: Coin[];
  public allTheCoins: Coin2;
  priceAscending: boolean;
  nameAscending: boolean;
  volumeAscending: boolean;
  changeAscending: boolean;

  constructor(private coinService: CoinService) { 
    Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.coins = [];
    this.priceAscending = true;
    this.nameAscending = true;
    this.volumeAscending = true;
    this.changeAscending = true;
    //console.log("running coin init");
    //let tickerList = ['btcusd','ethusd','zecusd','bchusd','ltcusd', 'batusd', 'daiusd'];
    //for (let index in tickerList){
      //console.log(index); 
      //this.getCoins(tickerList[index]);
      //console.log()
    //}
    this.getGraph();
  }
  public getGraph(): void {
    this.coinService.getGraphData().subscribe(
      (response: Coin2) => {
        this.allTheCoins = response;
        for(var index = 0; index < this.allTheCoins.results.length; index++){
          //I have no idea why I need to subtract 5 from the length to chop off the USD at the end... maybe trailing white space? Weird. 
          //I chopped off the 'X:' at the beginng as well, no idea why the API adds that.
          this.allTheCoins.results[index].T = this.allTheCoins.results[index].T.substr(2, (this.allTheCoins.results[index].T.length - 2) );
          this.allTheCoins.results[index].percentChange = ((this.allTheCoins.results[index].c - this.allTheCoins.results[index].o) / this.allTheCoins.results[index].o) * 100
        }
        
        //console.log(this.allTheCoins);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getCoins(ticker: String): void {
    this.coinService.getCoin(ticker).subscribe(
      (response: Coin) => {
        this.coin = response;
        //console.log(this.coin);
        this.coins.push(this.coin);
        //console.log(this.coins[0].symbol);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  sortByPrice(){
    //console.log(this.allTheCoins);
    if(!this.priceAscending){
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        return a.c - b.c;
      });
      this.priceAscending = true;
    } else {
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        return b.c - a.c;
      });
      this.priceAscending = false;
    }
  }

  sortByName(){
    if(!this.nameAscending){
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        if( a.T < b.T){return -1;}
       else if(a.T > b.T){return 1;}
       else{return 0;} 
      });
      this.nameAscending = true;
    } else {
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        if( a.T < b.T){return 1;}
       else if(a.T > b.T){return -1;}
       else{return 0;} 
      });
      this.nameAscending = false;
    }

  }
  sortByVolume(){
    if(!this.volumeAscending){
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        return a.v - b.v;
      });
      this.volumeAscending = true;
    } else {
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        return b.v - a.v;
      });
      this.volumeAscending = false;
    }
  }
  sortByPercentChange(){
    if(!this.changeAscending){
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        return a.percentChange - b.percentChange;
      });
      this.changeAscending = true;
    } else {
      this.allTheCoins.results = this.allTheCoins.results.sort(function (a,b) {
        return b.percentChange - a.percentChange;
      });
      this.changeAscending = false;
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
