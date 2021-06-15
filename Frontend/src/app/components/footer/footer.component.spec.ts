import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FooterComponent} from './footer.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from '../../app.component';
import {ImprintComponent} from '../../pages/imprint/imprint.component';
import {ActivatedRoute, Router} from '@angular/router';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{provide: Router, useValue: router}],
            declarations: [FooterComponent],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to /impressum when navigateImprint() is called', () => {
        component.navigateImprint();
        expect(router.navigate).toHaveBeenCalledWith(['/impressum']);
    });
});
