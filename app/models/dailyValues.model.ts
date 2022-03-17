export interface dailyValues{
    T: string;  //symbol
    c: number;   //close price
    h: number;   //highest price
    l: number;    //lowest price
    o: number;   //open price
    t: BigInteger;   //timestart
    v: number;   //volume
    vw: number;   //volume weighted average price
    percentChange: number;  //24hour change to be calculated
}