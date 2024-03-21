import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CoinService } from '../services/coin.service';
import {Coin} from "../models/coin.model"
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-comparison-form-group',
  templateUrl: './comparison-form-group.component.html',
  styleUrls: ['./comparison-form-group.component.css']
})
export class ComparisonFormGroupComponent implements OnInit {

  comparisonForm: FormGroup;
 
  get ticker1() { return this.comparisonForm.get('ticker1'); }

  get ticker2() { return this.comparisonForm.get('ticker2'); }

  onSubmit(){
    const coin1 = this.comparisonForm.get('ticker1').value;
    var coin2 = this.comparisonForm.get('ticker2').value;
    this.getCoins(coin1, coin2);
    //this.sendCoins();
    //send coins is in get coins because im not sure how order of ops works here
  }

  public coin: Coin;
  public coins: Coin[];
  public continue: boolean;

  public getCoins(ticker1: String, ticker2:String): void {
    this.coinService.getCoin(ticker1).subscribe(
      (response: Coin) => {
        this.coin = response;
        this.sendCoins(response);
        //console.log(this.coin);
        this.coins.push(this.coin);
        //console.log("We in form group trying real hard");
        //console.log(this.coins[0].symbol);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.coinService.getCoin(ticker2).subscribe(
      (response: Coin) => {
        this.coin = response;
        //console.log(this.coin);
        this.coins.push(this.coin);
        this.sendCoins(response);
        this.continue = true;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    while(this.continue){
    }
  }

  @Output() comparisonEvent = new EventEmitter<Coin>();

  /*sendCoins() {
    console.log("send coins ran");
    this.coins.forEach(coin => {
      this.comparisonEvent.emit(coin);
    });
    
  }*/
  sendCoins(coin: Coin){
    this.comparisonEvent.emit(coin)
  }

  constructor(private fb: FormBuilder, private coinService: CoinService) { }

  ngOnInit(): void {
    this.coins = [];
    this.continue = false;
    this.comparisonForm = this.fb.group({
      ticker1: ['',
      [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^(btcusd|ethusd)$')
      ]
    ],
      ticker2: ['',
      [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^(btcusd|ethusd)$')
      ]
    ]
    })
    this.comparisonForm.valueChanges.subscribe();
  }

}
