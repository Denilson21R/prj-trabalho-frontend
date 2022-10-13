import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnimalComponent } from './modal-animal.component';

describe('ModalAnimalComponent', () => {
  let component: ModalAnimalComponent;
  let fixture: ComponentFixture<ModalAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
