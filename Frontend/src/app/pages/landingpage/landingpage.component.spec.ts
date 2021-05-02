import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LandingpageComponent} from './landingpage.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('LandingpageComponent', () => {
    let component: LandingpageComponent;
    let fixture: ComponentFixture<LandingpageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LandingpageComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
