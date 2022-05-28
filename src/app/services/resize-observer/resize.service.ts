import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class ResizeService implements OnDestroy {
  private resizeObserver: ResizeObserver;
  private _handleResize?: ResizeObserverCallback;

  constructor() {
    console.log('koliko puta');
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }

  observe(observer: Element, handleResize: ResizeObserverCallback) {
    this.resizeObserver.observe(observer);
    this._handleResize = handleResize;
  }

  handleResize(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    this._handleResize?.(entries, observer);
  }
}
