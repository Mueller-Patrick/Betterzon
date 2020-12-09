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
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: ChartOptions;

    constructor(
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.getProduct();
        this.getChartData();
    }

    getProduct(): void {
        this.apiService.getProduct(this.productId).subscribe(product => this.product = product);
    }

    getChartData(): void {
        this.chartOptions = {
            series: [
                {
                    name: 'Lowest Price',
                    data: [1061.20, 1060, 1070, 1040, 1061.20, 1061, 1100, 1070, 1061.20]
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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
            },
            stroke: {
                curve: 'stepline'
            }
        };
    }

}
