import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
})
export class DragComponent implements OnInit {
  @ViewChild('dragArea') dragArea: ElementRef<HTMLElement>;

  public mouseDown: Observable<any>;
  public mouseUp: Observable<any>;
  public mouseMove: Observable<any>;
  public press: boolean = false;
  public moveTemp: number;
  public moveingX: number;

  constructor() {}

  ngOnInit() {
    return;
  }

  ngAfterViewInit(): void {
    this.mouseDown = fromEvent(this.dragArea.nativeElement, 'mousedown');
    this.mouseUp = fromEvent(this.dragArea.nativeElement, 'mouseup');
    this.mouseMove = fromEvent(this.dragArea.nativeElement, 'mousemove');

    const source = this.mouseMove
      .pipe(
        tap((event) => {
          if (this.press) {
            if (Math.abs(this.moveTemp - event.clientX) < 2) return;

            if (this.moveTemp - event.clientX > 1) {
              console.log('scroll left');
              this.dragArea.nativeElement.scrollLeft -= 20;
            } else {
              console.log('scroll right');
              this.dragArea.nativeElement.scrollLeft += 20;
            }
            this.moveTemp = event.clientX;
          }
        })
      )
      .subscribe((event) => {});

    this.mouseDown
      .pipe(
        tap((event) => {
          this.press = true;
          this.moveTemp = event.clientX;
        })
      )
      .subscribe();

    this.mouseUp
      .pipe(
        tap((event) => {
          this.press = false;
        })
      )
      .subscribe();

    const mousedownIng = this.mouseDown;
  }
}
