import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseAdminComponent } from './entreprise-admin.component';

describe('EntrepriseAdminComponent', () => {
  let component: EntrepriseAdminComponent;
  let fixture: ComponentFixture<EntrepriseAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrepriseAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepriseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
