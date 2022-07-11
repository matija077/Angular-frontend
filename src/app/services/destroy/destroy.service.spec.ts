import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { DestroyService } from './destroy.service';

@Component({
  template: ``,
})
class TestDestroyComponent {}

describe('DestroyService', () => {
  let service: DestroyService;
  let component: TestDestroyComponent;
  let fixture: ComponentFixture<TestDestroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DestroyService],
    }).compileComponents();

    service = TestBed.inject(DestroyService);
    fixture = TestBed.createComponent(TestDestroyComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be closed', fakeAsync(() => {
    let isCompletedBS = false;
    let isCompletedObs = false;
    const subBS = service.takeUntilDestroyed(new BehaviorSubject(true));
    const subObs = service.takeUntilDestroyed(new Observable());

    subBS.subscribe({ complete: () => (isCompletedBS = true) });
    subObs.subscribe({ complete: () => (isCompletedObs = true) });

    tick();
    expect(isCompletedObs).toBeFalse();
    expect(isCompletedBS).toBeFalse();
  }));

  it('should not be closed component', fakeAsync(() => {
    let isCompleted = false;
    const sub = service.takeUntilDestroyedComponent(new BehaviorSubject(true));

    sub.subscribe({ complete: () => (isCompleted = true) });

    tick();
    expect(isCompleted).toBeFalse();
  }));

  it('should be closed', fakeAsync(() => {
    let isCompletedBS = false;
    let isCompletedObs = false;
    const subBS = service.takeUntilDestroyed(new BehaviorSubject(true));
    const subObs = service.takeUntilDestroyed(new Observable());

    subBS.subscribe({ complete: () => (isCompletedBS = true) });
    subObs.subscribe({ complete: () => (isCompletedObs = true) });

    service.destroy(subBS);
    tick();
    expect(isCompletedBS).toBeTrue();
    expect(isCompletedObs).toBeFalse();

    service.destroy(subObs);
    tick();
    expect(isCompletedObs).toBeTrue();
    expect(isCompletedBS).toBeTrue();
  }));

  it('should be closed component', fakeAsync(() => {
    let isCompleted = false;
    const sub = service.takeUntilDestroyedComponent(new BehaviorSubject(true));

    sub.subscribe({ complete: () => (isCompleted = true) });

    service.destroyComponent();
    tick();
    expect(isCompleted).toBeTrue();
  }));
});
