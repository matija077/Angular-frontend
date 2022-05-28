import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ResizeService } from '../resize-observer/resize.service';

interface IOrientationService {
  orientation: 'landscape' | 'portrait';
  isMobile: boolean;
}

@Injectable({
  providedIn: 'root',
  deps: [ResizeObserver],
})
export class OrientationService implements OnDestroy {
  private subject: Subject<IOrientationService>;

  constructor(@Inject('ResizeObserver') resize: ResizeService) {
    resize.observe(document.documentElement, this.handleResize.bind(this));
    this.subject = new Subject();
  }

  ngOnDestroy() {
    this.subject.complete();
  }

  handleResize(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    const p = document.documentElement;
    const width = Math.max(p.offsetWidth, p.scrollWidth, p.clientWidth);
    const height = Math.max(p.offsetHeight, p.scrollHeight, p.clientHeight);

    const orientation = width >= height ? 'landscape' : 'portrait';
    const isMobile = width < 600;

    this.subject.next({ orientation, isMobile });
  }

  subscribe() {
    return this.subject.asObservable();
  }
}
