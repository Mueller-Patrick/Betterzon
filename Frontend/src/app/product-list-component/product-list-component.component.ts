import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-product-list-component',
    templateUrl: './product-list-component.component.html',
    styleUrls: ['./product-list-component.component.css']
})
export class ProductListComponentComponent implements OnInit {
    testList: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.testList = ['Herbert', 'Sascha', 'Rolf'];
    }

    // async function getCrypto(query: object): Promise<object> {
    //     const url = new URL('https://backend.betterzon.xyz');
    //     const headers = {};
    //     const response = await fetch(url.toString(), {headers});
    //     return await response.json();
    // };

}
