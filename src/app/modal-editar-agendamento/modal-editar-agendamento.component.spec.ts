import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarAgendamentoComponent } from './modal-editar-agendamento.component';

describe('ModalEditarAgendamentoComponent', () => {
  let component: ModalEditarAgendamentoComponent;
  let fixture: ComponentFixture<ModalEditarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
