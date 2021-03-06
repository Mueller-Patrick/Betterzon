import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopBarComponent} from './top-bar.component';
import {FormBuilder} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {AbstractMockObservableService} from '../../mocks/mock.service';

class MockApiService extends AbstractMockObservableService {
    getUserInfo(): any {
        this.content = [];
        return this;
    }

    getSessionInfoFromLocalStorage(): any {
        this.content = [];
        return this;
    }
}

describe('TopBarComponent', () => {
    let component: TopBarComponent;
    let fixture: ComponentFixture<TopBarComponent>;
    let mockService;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        routerState: jasmine.createSpy('routerState')
    };

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            declarations: [TopBarComponent],
            providers: [{provide: ApiService, useValue: mockService}, {provide: Router, useValue: router}]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TopBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
