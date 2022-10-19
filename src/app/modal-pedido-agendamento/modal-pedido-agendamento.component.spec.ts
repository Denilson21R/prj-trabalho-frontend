import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPedidoAgendamentoComponent } from './modal-pedido-agendamento.component';

describe('ModalPedidoAgendamentoComponent', () => {
  let component: ModalPedidoAgendamentoComponent;
  let fixture: ComponentFixture<ModalPedidoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPedidoAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPedidoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
