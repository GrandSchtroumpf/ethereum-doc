import { MethodDoc, ContractDoc } from './../../models/doc';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'contract-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {
  @Input()
  method: MethodDoc;
  @Input()
  contract: ContractDoc;

  public code: string;
  public result: any;
  public params: any[];
  public paramColumns = ['name', 'type', 'description', 'input'];

  constructor() {}

  ngOnInit() {
    this.updateFile();
  }

  public updateFile() {
    this.code = this.getMethodContent();
  }

  public getType(type: string): string {
    switch (true) {
      // Array: Must be first
      case /\[([0-9]*)\]/.test(type): return 'string';  // TODO : add array specific entry
      // Tuple
      case /tuple?/.test(type): return 'string';  // TODO : add tuple specific entry
      // String
      case /string?/.test(type): return 'string';
      // Static Bytes
      case /bytes?/.test(type): return 'string';  // TODO : add 0x for hex number
      // Int / Uint
      case /int?/.test(type): return 'number';
      // Address
      case /address?/.test(type): return 'string';  // TODO : Add checksum
      // Bool
      case /bool?/.test(type): return 'boolean';
      default: return 'string';
    }
  }


  public getMethodContent() {
    const getPlaceholder = (type: string): string => {
    // Compare true with the result of the cases
    switch (true) {
      // Array: Must be first
      case /\[([0-9]*)\]/.test(type): return '[]';
      // Tuple
      case /tuple?/.test(type): return '{}';
      // String
      case /string?/.test(type): return 'Lorem Ipsum';
      // Static Bytes
      case /bytes?/.test(type): return '0x';
      // Int / Uint
      case /int?/.test(type): return '0';
      // Address
      case /address?/.test(type): return '0x0000000000000000000000000000000000000000';
      // Bool
      case /bool?/.test(type): return 'false';
      default: return '';
    }
    };

    /* INPUTS */
    const paramNames = this.method.params.map(param => param.name).join(", ");
    const params = this.method.params
      .map(param => {
        const description = param.description
          ? `\t// ${param.name} : ${param.description}`
          : "";
        const parameter = `const ${param.name} = ${JSON.stringify(
          param.value
        ) || getPlaceholder(param.type)};`;
        return parameter + description;
      })
      .join("\n");
    const inputs = this.method.params.length > 0 ? `// Inputs\n${params}\n` : '';

    /* OUTPUTS */
    let result: string;
    // If call method
    if (this.method.constant) {
      const call = `const result = await ${this.contract.name}Contract.${
        this.method.name
      }(${paramNames});\n`;
      const description = this.method.return.description
        ? `// ${this.method.return.description}`
        : "";
      result = call + description;
    // If send method
    } else {
      result = `await ${this.contract.name}Contract.${
        this.method.name
      }(${paramNames});`;
    }

    return `${inputs}// Outputs\n${result}`;
  }
}
