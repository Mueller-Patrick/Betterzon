import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewestPricesListComponent} from './newest-prices-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClient} from "@angular/common/http";
import {AbstractMockObservableService} from "../../mocks/mock.service";
import {ApiService} from "../../services/api.service";

class MockApiService extends AbstractMockObservableService {
    getCurrentPricePerVendor() {
        return this;
    }

    getVendors() {
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
