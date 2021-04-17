import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
    selector: 'app-landing-carousel',
    templateUrl: './landing-carousel.component.html',
    styleUrls: ['./landing-carousel.component.css']
})
export class LandingCarouselComponent implements OnInit {

    products: Product[] = [];

    @Input() showProductPicture: boolean;

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.loadParams();
        this.getProducts();
    }

    getProducts(): void {
        this.apiService.getProducts().subscribe(products => this.products = products);
        console.log(this.products);
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
