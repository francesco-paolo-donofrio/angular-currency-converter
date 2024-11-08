import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldComponentComponent } from './hello-world-component.component';

describe('HelloWorldComponentComponent', () => {
  let component: HelloWorldComponentComponent;
  let fixture: ComponentFixture<HelloWorldComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloWorldComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
