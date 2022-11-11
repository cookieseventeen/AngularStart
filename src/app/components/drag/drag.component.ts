import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, merge, switchMap } from 'rxjs';
import { tap, map, takeUntil, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
})
export class DragComponent implements OnInit {
  @ViewChild('dragArea') dragArea: ElementRef<HTMLElement>;

  public mouseDown$: Observable<any>;
  public mouseUp$: Observable<any>;
  public mouseLeave$: Observable<any>;
  public mouseMove$: Observable<any>;
  public stopEvent$: Observable<any>;
  public press: boolean = false;
  public moveTemp: number;
  public moveingX: number;

  constructor() {}

  ngOnInit() {
    return;
  }

  ngAfterViewInit(): void {
    this.mouseDown$ = fromEvent(this.dragArea.nativeElement, 'mousedown');
    this.mouseMove$ = fromEvent(this.dragArea.nativeElement, 'mousemove');
    this.mouseUp$ = fromEvent(this.dragArea.nativeElement, 'mouseup');
    this.mouseLeave$ = fromEvent(this.dragArea.nativeElement, 'mouseleave');

    const source = this.mouseDown$
      .pipe(
        switchMap(() => this.mouseMove$.pipe(takeUntil(this.mouseUp$))),
        tap((item) => {
          console.log(item);
        }),
        pairwise(),
        tap(console.log)
      )
      .subscribe();

    // this.stopEvent$ = merge(
    //   this.mouseUp$,
    //   this.mouseLeave$,
    // );

    /*
    const source = this.mouseMove$
      .pipe(
        tap((event) => {
          // if (this.press) {
          //   if (Math.abs(this.moveTemp - event.clientX) < 2) return;

          //   if (this.moveTemp - event.clientX > 1) {
          //     console.log('scroll left');
          //     this.dragArea.nativeElement.scrollLeft -= 20;
          //   } else {
          //     console.log('scroll right');
          //     this.dragArea.nativeElement.scrollLeft += 20;
          //   }
          //   this.moveTemp = event.clientX;
          // }
        }),
        map((event) => {
          return this.mouseMove$
        }),
        tap((event) => {
          console.log(event);
        }),
      ).subscribe((event) => { });

    this.mouseDown$
      .pipe(
        tap((event) => {
          this.press = true;
          this.moveTemp = event.clientX;
        })
      )
      .subscribe();

    this.stopEvent$
      .pipe(
        tap((event) => {
          this.press = false;
        })
      )
      .subscribe();
        */
  }
}
