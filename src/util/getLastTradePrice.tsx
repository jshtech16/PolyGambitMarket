export function getLastTradePrice(lastTradePrice: number) {
    let _lastTradePrice = '';
    let _lastTradePriceReverse = '';
    if (Math.round(lastTradePrice * 100) < 1) {
        _lastTradePrice = '<1%';
        _lastTradePriceReverse = '100%';
    } else {
        _lastTradePrice = String(Math.round(lastTradePrice * 100)) + '%';
        _lastTradePriceReverse = String(100 - Math.round(lastTradePrice * 100)) + '%'
    }

    return {
        lastTradePrice: _lastTradePrice,
        lastTradePriceReverse: _lastTradePriceReverse
    }
}