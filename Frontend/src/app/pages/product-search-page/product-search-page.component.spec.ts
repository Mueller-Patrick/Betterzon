import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductSearchPageComponent} from './product-search-page.component';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {ProductListComponent} from "../../components/product-list/product-list.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('ProductSearchPageComponent', () => {
    let component: ProductSearchPageComponent;
    let fixture: ComponentFixture<ProductSearchPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductSearchPageComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
