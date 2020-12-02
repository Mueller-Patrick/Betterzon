import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import process from 'process';
import {Product} from './models/product';
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
}
