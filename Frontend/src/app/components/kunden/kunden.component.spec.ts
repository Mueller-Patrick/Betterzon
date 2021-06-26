import {ComponentFixture, TestBed} from '@angular/core/testing';

import {KundenComponent} from './kunden.component';
import {AbstractMockObservableService} from '../../mocks/mock.service';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';
import {of} from 'rxjs';

class MockApiService extends AbstractMockObservableService {
    getProducts(): any {
        this.content = [];
        return this;
    }
}

class ActivatedRouteMock {
    public paramMap = of(convertToParamMap({
        testId: 'abc123',
        anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
    }));
}

describe('KundenComponent', () => {
    let component: KundenComponent;
    let fixture: ComponentFixture<KundenComponent>;
    let mockService;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            declarations: [KundenComponent],
            providers: [{provide: ApiService, useValue: mockService}, {provide: Router, useValue: router}, {
                provide: ActivatedRoute,
                useValue: ActivatedRouteMock
            }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(KundenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
