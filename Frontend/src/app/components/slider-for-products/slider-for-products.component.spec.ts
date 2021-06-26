import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderForProductsComponent} from './slider-for-products.component';

describe('SliderForProductsComponent', () => {
    let component: SliderForProductsComponent;
    let fixture: ComponentFixture<SliderForProductsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SliderForProductsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderForProductsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
