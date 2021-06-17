import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../models/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    pricesMap: any = {};
    @Input() numberOfProducts: number;
    @Input() showProductPicture: boolean;
    @Input() searchQuery: string;
    @Input() type: string;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.loadParams();
    }

    loadParams(): void {
        if (!this.numberOfProducts) {
            this.numberOfProducts = 10;
        }
        if (!this.showProductPicture) {
            this.showProductPicture = false;
        }
        if (!this.searchQuery) {
            this.searchQuery = '';
        }
        if (!this.type) {
            this.type = '';
        }

        switch (this.type) {
            case 'search': {
                this.getSearchedProducts();
                break;
            }
            default: {
                this.getProducts();
                break;
            }
        }
    }

    getProducts(): void {
        this.apiService.getProducts().subscribe(products => {
            this.products = products;
            this.getPrices();
        });
    }

    getPrices(): void {
        const productIds: number[] = [];
        this.products.forEach(
            product => productIds.push(product.product_id)
        )
        this.apiService.getProductsByIds(productIds).subscribe(
            prices => {
                prices.forEach(price => {
                    this.pricesMap[price.product_id] = price;
                })
            }
        )
    }


    getSearchedProducts(): void {
        this.apiService.getProductsByQuery(this.searchQuery).subscribe(products => this.products = products);
    }

    clickedProduct(product: Product): void {
        this.router.navigate([('/product/' + product.product_id)]);
    }


}
