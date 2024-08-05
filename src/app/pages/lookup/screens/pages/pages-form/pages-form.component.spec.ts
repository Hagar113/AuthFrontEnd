import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesFormComponent } from './pages-form.component';

describe('PagesFormComponent', () => {
  let component: PagesFormComponent;
  let fixture: ComponentFixture<PagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
