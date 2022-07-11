import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

type IObservable = Observable<unknown> | Subject<unknown>;
type IObservableAfterPipe = Observable<unknown> | AnonymousSubject<unknown>;
type IDestroyObservable = Subject<undefined>;

export class DestroyService {
  private destroyComponent$;
  private destroyMap;

  constructor() {
    this.destroyComponent$ = this.createDestroyObservable();
    this.destroyMap = new Map<IObservableAfterPipe, IDestroyObservable>();

    const a = new BehaviorSubject(true);
    const b = a.pipe(take(1));
    console.log(b);

    const a2 = new Observable();
    const b2 = a2.pipe(take(1));
    console.log(b2);
  }

  takeUntilDestroyedComponent(s: IObservable) {
    return this._takeUntilDestroyed(this.destroyComponent$, s);
  }

  takeUntilDestroyed(s: IObservable): IObservableAfterPipe {
    let destroy$ = this.destroyMap.get(s);
    if (destroy$) {
      return s;
    }

    destroy$ = this.createDestroyObservable();
    const takeUntil$ = this._takeUntilDestroyed(destroy$, s);
    this.destroyMap.set(takeUntil$, destroy$);

    return takeUntil$;
  }

  destroyComponent() {
    this._destroy(this.destroyComponent$);
  }

  destroy(s: IObservable) {
    const destroy$ = this.destroyMap.get(s);
    if (!destroy$) {
      return;
    }

    this._destroy(destroy$);
  }

  private createDestroyObservable(): IDestroyObservable {
    return new Subject();
  }

  private _takeUntilDestroyed(
    dest$: IDestroyObservable,
    source$: IObservable
  ): IObservableAfterPipe {
    return source$.pipe(takeUntil(dest$));
  }

  private _destroy(dest$: IDestroyObservable) {
    dest$.next(undefined);
    dest$.complete();
  }
}
