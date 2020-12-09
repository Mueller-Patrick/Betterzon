import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestPricesListComponent } from './newest-prices-list.component';

describe('NewestPricesListComponent', () => {
  let component: NewestPricesListComponent;
  let fixture: ComponentFixture<NewestPricesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestPricesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestPricesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
