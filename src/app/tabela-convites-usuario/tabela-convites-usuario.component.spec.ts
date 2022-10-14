import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaConvitesUsuarioComponent } from './tabela-convites-usuario.component';

describe('TabelaConvitesComponent', () => {
  let component: TabelaConvitesUsuarioComponent;
  let fixture: ComponentFixture<TabelaConvitesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaConvitesUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaConvitesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
