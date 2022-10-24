import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPermissoesUsuarioComponent } from './modal-permissoes-usuario.component';

describe('ModalPermissoesUsuarioComponent', () => {
  let component: ModalPermissoesUsuarioComponent;
  let fixture: ComponentFixture<ModalPermissoesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPermissoesUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPermissoesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
