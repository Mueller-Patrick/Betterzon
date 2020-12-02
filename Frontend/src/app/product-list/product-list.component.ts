import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Product} from '../models/product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[];

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        this.apiService.getProducts().subscribe(products => this.products = products);
    }

    clickedProduct(product: Product): void {
        this.router.navigate([('/helloworld/' + product.product_id)]);
    }

}
