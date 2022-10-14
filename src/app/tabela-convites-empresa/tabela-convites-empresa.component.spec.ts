import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaConvitesEmpresaComponent } from './tabela-convites-empresa.component';

describe('TabelaConvitesEmpresaComponent', () => {
  let component: TabelaConvitesEmpresaComponent;
  let fixture: ComponentFixture<TabelaConvitesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaConvitesEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaConvitesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
