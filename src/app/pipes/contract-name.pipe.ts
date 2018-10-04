import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'contractName'})
export class ContractNamePipe implements PipeTransform {
  transform(value: string, exponent: string): string {
    return value.split('/')[1];
  }
}
