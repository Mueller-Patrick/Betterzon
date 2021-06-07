import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingInfoSliderComponent } from './greeting-info-slider.component';

describe('GreetingInfoSliderComponent', () => {
  let component: GreetingInfoSliderComponent;
  let fixture: ComponentFixture<GreetingInfoSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetingInfoSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingInfoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
