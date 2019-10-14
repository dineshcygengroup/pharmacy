import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierListComponent } from './view-supplier-list.component';

describe('ViewSupplierListComponent', () => {
  let component: ViewSupplierListComponent;
  let fixture: ComponentFixture<ViewSupplierListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
