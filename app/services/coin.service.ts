import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { Coin } from "../models/coin.model";
import { Coin2 } from "../models/coin2.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CoinService {
    private apiServerUrl;

    constructor(private http: HttpClient) { }

    public getCoin(ticker: String): Observable<Coin> {
        //console.log(ticker);
        return this.http.get<Coin>(`https://api.gemini.com/v2/ticker/${ticker}`);
    }
    public getGraphData(){
        return this.http.get<Coin2>(`https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/2021-12-07?adjusted=true&apiKey=TxtHZSXi80orqiBI9tiojbqVTElQO5W4`);
    }
 }