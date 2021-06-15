import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotDealsWidgetComponent } from './hot-deals-widget.component';

describe('HotDealsWidgetComponent', () => {
  let component: HotDealsWidgetComponent;
  let fixture: ComponentFixture<HotDealsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotDealsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotDealsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
