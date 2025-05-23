import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBatchComponent } from './product-batch-register.component';

describe('ProductBatchComponent', () => {
  let component: ProductBatchComponent;
  let fixture: ComponentFixture<ProductBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
