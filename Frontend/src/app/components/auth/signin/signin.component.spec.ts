import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SigninComponent} from './signin.component';
import {AbstractMockObservableService} from '../../../mocks/mock.service';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

class MockApiService extends AbstractMockObservableService {
    loginUser(username: string, password: string): any {
        this.content = [];
        return this;
    }
}

describe('SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;
    let mockService;
    let formBuilder: FormBuilder;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            declarations: [SigninComponent],
            providers: [{provide: ApiService, useValue: mockService}, {provide: Router, useValue: router}, FormBuilder]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        formBuilder = TestBed.get(FormBuilder);
        component.loginForm = formBuilder.group({
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
