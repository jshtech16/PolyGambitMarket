import { EventInterface, MarketInterface } from "@/interfaces/market.interface";

export function sortByMarkets(event: EventInterface): MarketInterface[] {
    let _markets: MarketInterface[] = [];
    _markets = event.markets.filter((item) => !item.automaticallyResolved && !item.archived);
    if (event.sortBy === "price") {
        _markets = _markets.sort((b, a) => {
            const aValue = parseFloat(a.outcomePrices?.split('"')[1]);
            const bValue = parseFloat(b.outcomePrices?.split('"')[1]);
            return aValue - bValue;
        })
    } else if (event.sortBy === "ascending") {
        _markets = _markets.sort(
            (a, b) => Number(a.groupItemThreshold) - Number(b.groupItemThreshold)
        );
    } else {
        _markets = _markets.sort(
            (a, b) => Number(a.groupItemThreshold) - Number(b.groupItemThreshold)
        );
    }

    return _markets;
}