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

  public getMethodContent() {
    const getPlaceholder = type => {
      switch (type) {
        case 'string':
          return '"Lorem Ipsum"';
        // TODO
      }
    };

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

    return `// Inputs
${params}
// Outputs
${result}`;
  }
}
