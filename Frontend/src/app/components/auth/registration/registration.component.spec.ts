import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationComponent} from './registration.component';
import {AbstractMockObservableService} from '../../../mocks/mock.service';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

class MockApiService extends AbstractMockObservableService {
    registerUser(username: string, password: string, email: string): any {
        this.content = [];
        return this;
    }
}

describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let mockService;
    let formBuilder: FormBuilder;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            declarations: [RegistrationComponent],
            providers: [{provide: ApiService, useValue: mockService}, {provide: Router, useValue: router}, FormBuilder]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        component = fixture.componentInstance;
        formBuilder = TestBed.get(FormBuilder);
        component.form = formBuilder.group({
            recipientTypes: new FormControl(
                {
                    value: ['mock'],
                    disabled: true
                },
                Validators.required
            )
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
