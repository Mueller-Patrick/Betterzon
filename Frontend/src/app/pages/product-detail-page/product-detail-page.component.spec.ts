import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailPageComponent} from './product-detail-page.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProductDetailPageComponent', () => {
    let component: ProductDetailPageComponent;
    let fixture: ComponentFixture<ProductDetailPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductDetailPageComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
