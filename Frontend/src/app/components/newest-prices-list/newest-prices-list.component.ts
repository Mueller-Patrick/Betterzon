import {Component, Input, OnInit} from '@angular/core';
import {Price} from '../../models/price';
import {Vendor} from '../../models/vendor';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-newest-prices-list',
    templateUrl: './newest-prices-list.component.html',
    styleUrls: ['./newest-prices-list.component.css']
})
export class NewestPricesListComponent implements OnInit {
    @Input() productId: number;
    prices: Price[] = [];
    vendors: Vendor[] = [];
    vendorMap = {};

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.getVendors();
        this.getPrices();
    }

    getPrices(): void {
        // Lowest prices
        this.apiService.getCurrentPricePerVendor(this.productId).subscribe(
            prices => {
                this.prices = prices;
            });
    }

    getVendors(): void {
        this.apiService.getVendors().subscribe(vendors => {
            this.vendors = vendors;

            this.vendors.forEach(vendor => {
                this.vendorMap[vendor.vendor_id] = vendor;
            });
        });
    }

}
