import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-detail-page',
    templateUrl: './product-detail-page.component.html',
    styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
    productId: string;

    constructor(
        private router: Router
    ) {
        this.productId = router.url.substr(9, router.url.length);
    }

    ngOnInit(): void {
    }

}
