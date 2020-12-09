import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchPageComponent } from './product-search-page.component';

describe('ProductSearchPageComponent', () => {
  let component: ProductSearchPageComponent;
  let fixture: ComponentFixture<ProductSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
