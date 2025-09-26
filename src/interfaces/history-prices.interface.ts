export interface HistoryPriceInterface {
    history: HistoryPriceChildInterface[];
}

export interface HistoryPriceChildInterface {
    t: number;
    p: number;
    p1: number;
    p2: number;
    customT: string;
}