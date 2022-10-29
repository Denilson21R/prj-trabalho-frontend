import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadoresDadosComponent } from './contadores-dados.component';

describe('ContadoresDadosComponent', () => {
  let component: ContadoresDadosComponent;
  let fixture: ComponentFixture<ContadoresDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadoresDadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadoresDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
