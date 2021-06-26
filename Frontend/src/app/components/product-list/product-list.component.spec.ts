import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductListComponent} from './product-list.component';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ApiService} from '../../services/api.service';
import {AbstractMockObservableService} from '../../mocks/mock.service';
import {Router} from '@angular/router';

class MockApiService extends AbstractMockObservableService {
    getProducts(): any {
        this.content = [];
        return this;
    }

    getProductsByQuery(): any {
        this.content = [];
        return this;
    }
}

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let mockService;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            providers: [{provide: ApiService, useValue: mockService}, {provide: Router, useValue: router}],
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

    it('should load products by search query when type is search', () => {
        component.type = 'search';
        component.loadParams();
        expect(component.products).toBeTruthy();
    });

    it('should navigate to /product/xyz when navigateImprint() is called', () => {
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
            category_id: 1,
            price: 0
        };

        component.clickedProduct(product);
        expect(router.navigate).toHaveBeenCalledWith(['/product/1']);
    });
});
