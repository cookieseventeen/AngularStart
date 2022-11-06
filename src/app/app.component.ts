import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { takeUntil, takeWhile, skipUntil, tap, map } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular ' + VERSION.major;

  @ViewChild('dragArea') dragArea: ElementRef<HTMLElement>;

  public mouseDown: Observable<any>;
  public mouseUp: Observable<any>;
  public mouseMove: Observable<any>;
  public press: boolean = false;
  public moveTemp: number;
  public moveingX: number;

  ngOnInit(): void {
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
