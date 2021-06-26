import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetpasswortComponent} from './resetpasswort.component';

describe('ResetpasswortComponent', () => {
    let component: ResetpasswortComponent;
    let fixture: ComponentFixture<ResetpasswortComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResetpasswortComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetpasswortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
