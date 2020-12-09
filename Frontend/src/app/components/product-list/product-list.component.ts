import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../models/product';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[];
    @Input() numberOfProducts: number;
    @Input() showProductPicture: boolean;
    type: string;

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.getProducts();

        if (!this.numberOfProducts) {
            this.numberOfProducts = 10;
        }
        if (!this.showProductPicture) {
            this.showProductPicture = false;
        }
        this.type = 'PLP';
    }

    getProducts(): void {
        this.apiService.getProducts().subscribe(products => this.products = products);
    }

    clickedProduct(product: Product): void {
        this.router.navigate([('/product/' + product.product_id)]);
    }

}
