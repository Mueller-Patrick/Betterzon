import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsComponent} from './product-details.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AbstractMockObservableService} from "../../mocks/mock.service";
import {ApiService} from "../../services/api.service";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";

class MockApiService extends AbstractMockObservableService {
    getProduct() {
        this.content = {};
        return this;
    }

    getLowestPrices() {
        const price = {
            price_id: 1,
            product_id: 1,
            vendor_id: 1,
            price_in_cents: 123,
            timestamp: new Date()
        };
        this.content = [price];
        return this;
    }

    getAmazonPrice() {
        this.content = {};
        return this;
    }

    getVendors() {
        this.content = [];
        return this;
    }
}

describe('ProductDetailsComponent', () => {
    let component: ProductDetailsComponent;
    let fixture: ComponentFixture<ProductDetailsComponent>;
    let mockService;

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            providers: [{provide: ApiService, useValue: mockService}],
            declarations: [ProductDetailsComponent],
            imports: [
                RouterTestingModule,
                NgApexchartsModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
