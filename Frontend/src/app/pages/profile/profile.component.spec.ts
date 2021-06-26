import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileComponent} from './profile.component';
import {AbstractMockObservableService} from '../../mocks/mock.service';
import {ApiService} from '../../services/api.service';

class MockApiService extends AbstractMockObservableService {
    getUserInfo(): any {
        this.content = [];
        return this;
    }

    getPriceAlarms(): any {
        this.content = [];
        return this;
    }

    getProductsByIds(): any {
        this.content = [];
        return this;
    }
}

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let mockService;

    beforeEach(async () => {
        mockService = new MockApiService();
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent],
            providers: [{provide: ApiService, useValue: mockService}]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
