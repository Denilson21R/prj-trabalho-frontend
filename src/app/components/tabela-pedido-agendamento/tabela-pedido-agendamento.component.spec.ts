import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPedidoAgendamentoComponent } from './tabela-pedido-agendamento.component';

describe('TabelaPedidoAgendamentoComponent', () => {
  let component: TabelaPedidoAgendamentoComponent;
  let fixture: ComponentFixture<TabelaPedidoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaPedidoAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPedidoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
