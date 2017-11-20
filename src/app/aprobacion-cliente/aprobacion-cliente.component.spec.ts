import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionClienteComponent } from './aprobacion-cliente.component';

describe('AprobacionClienteComponent', () => {
  let component: AprobacionClienteComponent;
  let fixture: ComponentFixture<AprobacionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
