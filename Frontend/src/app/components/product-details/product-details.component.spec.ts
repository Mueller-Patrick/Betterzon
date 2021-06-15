import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsComponent} from './product-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AbstractMockObservableService} from '../../mocks/mock.service';
import {ApiService} from '../../services/api.service';
import {ChartComponent, NgApexchartsModule} from 'ng-apexcharts';
import {By} from '@angular/platform-browser';

class MockApiService extends AbstractMockObservableService {
    getProduct(): any {
        const product = {
            product_id: 1,
            asin: 'ASIN',
            is_active: true,
            name: 'Super tolles Produkt',
            short_description: 'Descr',
            long_description: 'Descr',
            image_guid: '123',
            date_added: new Date(),
            last_modified: new Date(),
            manufacturer_id: 1,
            selling_rank: '1',
            category_id: 1
        };
        this.content = product;
        return this;
    }

    getLowestPrices(): any {
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

    getAmazonPrice(): any {
        this.content = {};
        return this;
    }

    getVendors(): any {
        const vendor = {
            vendor_id: 1,
            name: 'Max Mustermann',
            streetname: 'Musterstraße 69',
            zip_code: '12345',
            city: 'Musterhausen',
            country_code: 'DE',
            phone: '+49 123 4567890',
            website: 'https://www.amazon.de',
        };
        this.content = [vendor];
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

    it('should show the product name', () => {
        component.ngOnInit();
        const title = fixture.debugElement.query(By.css('.productTitle'));
        expect(title.nativeElement.innerText).toEqual('Super tolles Produkt');
    });
});
