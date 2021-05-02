import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ApiService} from "../../services/api.service";
import {AbstractMockObservableService} from "../../mocks/mock.service";

class MockApiService extends AbstractMockObservableService {
    getProducts() {
        return this;
    }

    getProductsByQuery() {
        return this;
    }
}

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let mockService;

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            providers: [{provide: ApiService, useValue: mockService}],
            declarations: [ProductListComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
