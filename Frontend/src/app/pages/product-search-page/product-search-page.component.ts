import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-product-search-page',
    templateUrl: './product-search-page.component.html',
    styleUrls: ['./product-search-page.component.css']
})
export class ProductSearchPageComponent implements OnInit {
    searchTerm: string;

    constructor(
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.searchTerm = this.route.snapshot.queryParamMap.get('q');
    }

}
