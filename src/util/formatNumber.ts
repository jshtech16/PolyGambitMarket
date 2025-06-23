export function formatNumber(num: number): string {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + 'b';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'm';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'k';
    } else {
        return (num / 1e0).toFixed(1);
    }
}

export function getRoundingUpNumber(num: number) {
    if ((num - Math.floor(num)) >= 0.45) {
        return Math.floor(num) + 1;
    } else {
        return Math.floor(num);
    }
}