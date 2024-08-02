import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyTableComponent } from './easy-table.component';

describe('EasyTableComponent', () => {
  let component: EasyTableComponent;
  let fixture: ComponentFixture<EasyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
