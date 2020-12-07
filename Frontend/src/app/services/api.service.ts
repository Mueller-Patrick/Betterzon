import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import process from 'process';
import {Product} from '../models/product';
import {Price} from '../models/price';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl = 'https://backend.betterzon.xyz';

    constructor(
        private http: HttpClient
    ) {
    }

    getProducts(): Observable<Product[]> {
        try {
            const prods = this.http.get<Product[]>((this.apiUrl + '/products'));
            console.log(prods);
            return prods;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }

    getPrices(): Observable<Price[]> {
        try {
            const prices = this.http.get<Price[]>((this.apiUrl + '/prices'));
            console.log(prices);
            return prices;
        } catch (exception) {
            process.stderr.write(`ERROR received from ${this.apiUrl}: ${exception}\n`);
        }
    }
}
