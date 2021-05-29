import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LandingpageComponent} from './landingpage.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

describe('LandingpageComponent', () => {
    let component: LandingpageComponent;
    let fixture: ComponentFixture<LandingpageComponent>;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{provide: Router, useValue: router}],
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
