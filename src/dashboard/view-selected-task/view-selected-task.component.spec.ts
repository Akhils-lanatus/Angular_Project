import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectedTaskComponent } from './view-selected-task.component';

describe('ViewSelectedTaskComponent', () => {
  let component: ViewSelectedTaskComponent;
  let fixture: ComponentFixture<ViewSelectedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSelectedTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSelectedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
