import { Injectable } from '@angular/core';
import { Scroll } from '@angular/router';
import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  distinctUntilChanged,
  fromEvent,
  map,
  pairwise,
  throttleTime,
} from 'rxjs';
import { ScrollingStates } from 'src/app/types/consts';

/**
 * You are responsilbe for unsubscribing
 *
 * @export
 * @class ScrollingDirectionService
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollingDirectionService {
  constructor() {
    const work = console.log;
    animationFrameScheduler.schedule(work, 0, 'animation');
    asapScheduler.schedule(work, 0, 'asap');
    asyncScheduler.schedule(work, 0, 'async');
  }

  createScrollingDirective(
    limitHeight: number,
    subscribe: { next: (direction: ScrollingStates) => void },
    takeUntilDestroyed?: any
  ) {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(0, animationFrameScheduler),
        map(() => window.pageYOffset),
        pairwise(),
        map(([oldValue, newValue]) => {
          if (window.pageYOffset < limitHeight) {
            return ScrollingStates.REST;
          }
          return newValue > oldValue
            ? ScrollingStates.DOWN
            : ScrollingStates.UP;
        }),
        distinctUntilChanged()
        //takeUntil(takeUntilDestroyed)
      )
      .subscribe(subscribe);
  }
}
