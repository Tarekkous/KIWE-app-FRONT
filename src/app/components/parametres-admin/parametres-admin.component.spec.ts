import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresAdminComponent } from './parametres-admin.component';

describe('ParametresAdminComponent', () => {
  let component: ParametresAdminComponent;
  let fixture: ComponentFixture<ParametresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
