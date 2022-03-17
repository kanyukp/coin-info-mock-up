import { dailyValues } from "./dailyValues.model";

export interface Coin2 {
    adjusted: boolean;
    queryCount: number;
    results: dailyValues[];
}

