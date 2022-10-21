import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarAgendamentoComponent } from './modal-visualizar-agendamento.component';

describe('ModalVisualizarAgendamentoComponent', () => {
  let component: ModalVisualizarAgendamentoComponent;
  let fixture: ComponentFixture<ModalVisualizarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVisualizarAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVisualizarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
