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
    amazonPrices = [];
    productsPricesMap = new Map();
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
                break;
            }
            default: {
                this.getProductsByIds();
                this.getAmazonPricesForBestDeals();
                this.getVendors()
                break;
            }
        }
    }

    getProductsByIds(): void {
        this.apiService.getProductsByIds(this.bestDealsProductIds).subscribe(
            products => {
                products.forEach(product => {
                    this.productsPricesMap [product.product_id].product = product;
                });
            }
        );
    }

    getBestDeals(): void {
        this.apiService.getBestDeals(9).subscribe(
            deals => {
                deals.forEach(deal => {
                    this.bestDealsProductIds.push(deal.product_id);
                    this.productsPricesMap [deal.product_id] = {lowestPrice: deal}
                });
                this.loadParams();
            }
        );
    }

    getVendors(): void {
        this.productsPricesMap.keys().forEach(
            key => {
                const currentDeal = this.productsPricesMap[key].lowestPrice;
                this.apiService.getVendorById(currentDeal.vendor_id).subscribe(
                    vendor => {
                        this.productsPricesMap[key].vendor = vendor
                    })
            })
    }


    getAmazonPricesForBestDeals(): void{
        this.bestDealsProductIds.forEach(id => {
                this.apiService.getAmazonPrice(id).subscribe(
                    price => {
                        this.amazonPrices.push(price);
                        this.productsPricesMap[price[0].product_id].amazonPrice = price[0];
                    }
                );
            }
        );
    }

    getSearchedProducts(): void {
        this.apiService.getProductsByQuery(this.searchQuery).subscribe(products => this.products = products);
    }

    clickedProduct(productId: string): void {
        this.router.navigate([('/product/' + productId)]);
    }


}
