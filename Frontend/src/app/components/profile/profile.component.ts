import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: any;
    obj: any;
    alarms: any [];
    productsMap: any = {};

    constructor(private api: ApiService) {
    }

    ngOnInit(): void {

        this.api.getUserInfo().subscribe(
            user => {
                this.currentUser = user;
                console.log(this.currentUser);
            },
        );

        this.getPriceAlarms();
    }

    getPriceAlarms(): void {
        this.api.getPriceAlarms().subscribe(
            alarms => {
                this.alarms = alarms;
                this.getProductsByIds();
            }
        );
    }

    getProductsByIds(): void {
        const productIds: number [] = [];
        this.alarms.forEach(
            alarm => {
                productIds.push(alarm.product_id);
            }
        );
        this.api.getProductsByIds(productIds).subscribe(
            products => {
                products.forEach(
                    product => {
                        this.productsMap[product.product_id] = product;
                    }
                );
            }
        );
    }

    delete(id: number): void {
        this.api.deletePriceAlarm(id).subscribe(
            res => window.location.reload()
        );
    }
}
