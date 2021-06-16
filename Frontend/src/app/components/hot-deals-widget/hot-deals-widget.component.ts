import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Product} from '../../models/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-hot-deals-widget',
  templateUrl: './hot-deals-widget.component.html',
  styleUrls: ['./hot-deals-widget.component.css']
})
export class HotDealsWidgetComponent implements OnInit {

    products: Product[] = [];
    bestDealsProductIds = [];
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
        this.getBestDeals();
    }

    loadParams(): void {
        if (!this.numberOfProducts) {
            this.numberOfProducts = 9;
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
                this.getProductsByIds();
                break;
            }
        }
    }

    getProductsByIds(): void {
        this.apiService.getProductsByIds(this.bestDealsProductIds).subscribe(
            products => this.products = products
        );
    }


    getBestDeals(): void {
        this.apiService.getBestDeals(9).subscribe(
            deals => {
                deals.forEach(deal => {
                    this.bestDealsProductIds.push(deal.product_id);
                });
            }
        );
    }

    getSearchedProducts(): void {
        this.apiService.getProductsByQuery(this.searchQuery).subscribe(products => this.products = products);
    }

    clickedProduct(product: Product): void {
        this.router.navigate([('/product/' + product.product_id)]);
    }


}
