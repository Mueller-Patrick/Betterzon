export interface Price {
    price_id: number;
    product_id: number;
    vendor_id: number;
    price_in_cents: number;
    timestamp: Date;
}

export class Deal implements Price {
    price_id: number;
    product_id: number;
    vendor_id: number;
    price_in_cents: number;
    timestamp: Date;
    amazonDifference: number;
    amazonDifferencePercent: number;

    constructor(price_id: number, product_id: number, vendor_id: number, price_in_cents: number, timestamp: Date, amazonDifference: number, amazonDifferencePercent: number) {
        this.price_id = price_id;
        this.product_id = product_id;
        this.vendor_id = vendor_id;
        this.price_in_cents = price_in_cents;
        this.timestamp = timestamp;
        this.amazonDifference = amazonDifference;
        this.amazonDifferencePercent = amazonDifferencePercent;
    }
}
