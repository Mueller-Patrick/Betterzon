import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewestPricesListComponent} from './newest-prices-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClient} from "@angular/common/http";
import {AbstractMockObservableService} from "../../mocks/mock.service";
import {ApiService} from "../../services/api.service";

class MockApiService extends AbstractMockObservableService {
    getCurrentPricePerVendor() {
        this.content = [];
        return this;
    }

    getVendors() {
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

describe('NewestPricesListComponent', () => {
    let component: NewestPricesListComponent;
    let fixture: ComponentFixture<NewestPricesListComponent>;
    let mockService;

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            providers: [{provide: ApiService, useValue: mockService}],
            declarations: [NewestPricesListComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewestPricesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
