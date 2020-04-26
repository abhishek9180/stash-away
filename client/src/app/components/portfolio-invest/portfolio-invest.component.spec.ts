import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioInvestComponent } from './portfolio-invest.component';

describe('PortfolioInvestComponent', () => {
  let component: PortfolioInvestComponent;
  let fixture: ComponentFixture<PortfolioInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioInvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
