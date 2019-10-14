import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSnackBarComponent } from './simple-snack-bar.component';

describe('SimpleSnackBarComponent', () => {
  let component: SimpleSnackBarComponent;
  let fixture: ComponentFixture<SimpleSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
