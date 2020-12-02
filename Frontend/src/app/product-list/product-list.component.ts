import {Component, OnInit} from '@angular/core';
import axios, {AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse} from 'axios';
import process from 'process';
import {ApiService} from '../api.service';
import {Product} from '../models/product';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[];

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        this.apiService.getProducts().subscribe(products => this.products = products);
    }

}
