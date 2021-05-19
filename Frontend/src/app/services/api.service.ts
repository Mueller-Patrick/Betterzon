import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import process from 'process';
import {Product} from '../models/product';
import {Price} from '../models/price';
import {Observable, of} from 'rxjs';
import {Vendor} from '../models/vendor';
import {PriceAlarm} from '../models/pricealarm';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl = 'https://backend.betterzon.xyz';

    constructor(
        private http: HttpClient
    ) {
    }

    getProduct(id): Observable<Product> {
        try {
            const prod = this.http.get<Product>((this.apiUrl + '/products/' + id));
            return prod;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getProductsByQuery(query): Observable<Product[]> {
        try {
            const prods = this.http.get<Product[]>((this.apiUrl + '/products/search/' + query));
            return prods;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getProducts(): Observable<Product[]> {
        try {
            const prods = this.http.get<Product[]>((this.apiUrl + '/products'));
            return prods;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getPrices(): Observable<Price[]> {
        try {
            const prices = this.http.get<Price[]>((this.apiUrl + '/prices'));
            return prices;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getLowestPrices(productId): Observable<Price[]> {
        try {
            let params = new HttpParams();
            params = params.append('product', productId);
            params = params.append('type', 'lowest');
            const prices = this.http.get<Price[]>((this.apiUrl + '/prices'), {params});
            return prices;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getAmazonPrice(productId): Observable<Price> {
        try {
            let params = new HttpParams();
            params = params.append('product', productId);
            params = params.append('vendor', '1');
            params = params.append('type', 'newest');
            const price = this.http.get<Price>((this.apiUrl + '/prices'), {params});
            return price;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getCurrentPricePerVendor(productId): Observable<Price[]> {
        try {
            let params = new HttpParams();
            params = params.append('product', productId);
            params = params.append('type', 'newest');
            const prices = this.http.get<Price[]>((this.apiUrl + '/prices'), {params});
            return prices;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getVendors(): Observable<Vendor[]> {
        try {
            const vendors = this.http.get<Vendor[]>((this.apiUrl + '/vendors'));
            return vendors;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getPriceAlarms(): Observable<PriceAlarm[]> {
        try {
            const alarms = this.http.get<PriceAlarm[]>((this.apiUrl + '/pricealarms'));
            return alarms;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    createPriceAlarms(productId: number, definedPrice: number): Observable<any> {
        try {
            const res = this.http.post((this.apiUrl + '/pricealarms'), JSON.stringify({
                product_id: productId,
                defined_price: definedPrice
            }));
            return res;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    updatePriceAlarms(alarmId: number, definedPrice: number): Observable<any> {
        try {
            const res = this.http.put((this.apiUrl + '/pricealarms'), JSON.stringify({
                alarm_id: alarmId,
                defined_price: definedPrice
            }));
            return res;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }
}
