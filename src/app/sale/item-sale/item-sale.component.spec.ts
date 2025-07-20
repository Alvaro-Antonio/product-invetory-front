import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSaleComponent } from './item-sale.component';

describe('ItemSaleComponent', () => {
  let component: ItemSaleComponent;
  let fixture: ComponentFixture<ItemSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
