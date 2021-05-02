import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, of} from "rxjs";
import {CalcService} from "./calc.service";
import {catchError, map, mergeMap, retry} from "rxjs/operators";

@Component({
  selector: 'nz-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent {
  constructor(private calcService: CalcService) {
  }

  x = new FormControl('');
  y = new FormControl('');

  result$: Observable<string> = of(' ')

  onCalc() {
    const x = +this.x.value
    const y = +this.y.value

    if (!isFinite(x) || !isFinite(y)) {
      this.result$ = of('x and y must be a finite number')
    } else {
      this.result$ = this.calcService.getASum(x, y)
        .pipe(mergeMap(sumResult => this.calcService.getAProduct(sumResult)))
        .pipe(mergeMap(productResult => this.calcService.getAPower(productResult)))
        .pipe(map(result => "Result: " + result))
        .pipe(retry(3))
        .pipe(catchError(err => {
          console.error(err)
          return of("An error occurred calling the remote service!")
        }))
    }
  }
}
