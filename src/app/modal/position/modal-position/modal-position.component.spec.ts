import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPositionComponent } from './modal-position.component';

describe('ModalPositionComponent', () => {
  let component: ModalPositionComponent;
  let fixture: ComponentFixture<ModalPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
