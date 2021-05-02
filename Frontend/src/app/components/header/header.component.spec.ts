import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatMenuModule} from "@angular/material/menu";
import {Router} from "@angular/router";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router = {
        navigate: jasmine.createSpy('navigate'),
        navigateByUrl: (url: string) => {
            return {
                then: () => {}
            }
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [{provide: Router, useValue: router}],
            declarations: [HeaderComponent],
            imports: [
                RouterTestingModule,
                MatMenuModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
