import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    testList: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.testList = ['Herbert', 'Sascha', 'Rolf'];
    }

}
