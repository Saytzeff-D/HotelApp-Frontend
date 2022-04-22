import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value * Number(args[0]) * Number(args[1]);
  }

}
