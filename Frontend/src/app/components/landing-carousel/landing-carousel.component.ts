import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Deal} from '../../models/deal';

@Component({
    selector: 'app-landing-carousel',
    templateUrl: './landing-carousel.component.html',
    styleUrls: ['./landing-carousel.component.css']
})
export class LandingCarouselComponent implements OnInit {

    products: Product[] = [];
    deals: Deal[] = [];
    @Input() showProductPicture: boolean;

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.loadParams();
        this.getProducts();
        this.getBestDeals();
    }

    getProducts(): void {
        this.apiService.getProducts().subscribe(products => this.products = products);
    }

    getBestDeals(): void {
        this.apiService.getBestDealPrices(5).subscribe(prices => {
            const productIds: number[] = [];
            const priceMap = {};

            prices.forEach(price => {
                productIds.push(price.product_id);
                priceMap[price.product_id] = price;
            });

            this.apiService.getProductsByIds(productIds).subscribe(products => {
                products.forEach(thisProduct => {
                    const deal: Deal = {
                        product: thisProduct,
                        price: priceMap[thisProduct.product_id]
                    };
                    this.deals.push(deal);
                });
            });
        });
    }

    loadParams(): void {
        if (!this.showProductPicture) {
            this.showProductPicture = true;
        }
    }

    clickedProduct(product: Product): void {
        this.router.navigate([('/product/' + product.product_id)]);
    }
}
