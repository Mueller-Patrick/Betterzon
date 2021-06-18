import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../models/product';
import {ApiService} from '../../services/api.service';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexTitleSubtitle, ApexStroke
} from 'ng-apexcharts';
import {Price} from '../../models/price';
import {Vendor} from '../../models/vendor';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    title: ApexTitleSubtitle;
    stroke: ApexStroke;
};

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    @Input() productId: number;
    product: Product;
    lowestPrices: Price[];
    currentlyLowestPrice: Price;
    currentAmazonPrice: Price;
    vendors: Vendor[] = [];
    vendorMap = {};
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: ChartOptions;
    isLoggedIn: boolean;
    price: any;

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.getProduct();
        this.getVendors();
        this.getPrices();
        if (this.apiService.getSessionInfoFromLocalStorage().session_id != '') {
            this.isLoggedIn = true;
        }
    }

    getProduct(): void {
        this.apiService.getProduct(this.productId).subscribe(product => {
            this.product = product;
        });
    }

    getPrices(): void {
        // Lowest prices
        this.apiService.getLowestPrices(this.productId).subscribe(
            prices => {
                this.lowestPrices = prices;
                this.currentlyLowestPrice = prices[prices.length - 1];

                // Update charts
                this.getChartData();
            });

        // Amazon price
        this.apiService.getAmazonPrice(this.productId).subscribe(price => {
            this.currentAmazonPrice = price[0];
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

    getChartData(): void {
        const prices = [];
        const categs = [];
        this.lowestPrices?.forEach(price => {
            prices.push(price.price_in_cents / 100);
            categs.push(new Date(price.timestamp).toDateString());
        });

        this.chartOptions = {
            series: [
                {
                    name: 'Lowest Price',
                    data: prices
                }
            ],
            chart: {
                height: 350,
                type: 'area'
            },
            title: {
                text: 'Lowest price'
            },
            xaxis: {
                categories: categs
            },
            stroke: {
                curve: 'stepline'
            }
        };
    }

    getAmazonPriceDifference(): number {
        const amazonPrice = this.currentAmazonPrice?.price_in_cents;
        const lowestPrice = this.currentlyLowestPrice?.price_in_cents;

        const percentage = ((amazonPrice / lowestPrice) - 1) * 100;

        return Math.round(percentage);
    }

    setPriceAlarm(): void {
        this.apiService.createPriceAlarms(this.productId, this.price * 100).subscribe(
            alarms => console.log(alarms)
        );
    }


}
