import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConvidarUsuarioComponent } from './modal-convidar-usuario.component';

describe('ModalConvidarUsuarioComponent', () => {
  let component: ModalConvidarUsuarioComponent;
  let fixture: ComponentFixture<ModalConvidarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConvidarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConvidarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
