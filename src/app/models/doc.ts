import { ABIDefinition } from './compiler';

export interface ContractDoc {
  name?: string;
  code?: string;
  owner?: string;
  title?: string;
  author?: string;
  methods: {
    [method: string]: MethodDoc;
  };
  addresses?: Addresses;
  abi?: ABIDefinition[];
  bytecode?: string;
}

export interface Addresses {
  ropsten: string;
  mainnet: string;
  kovan: string;
  rinkeby: string;
}

export interface MethodDoc {
  name: string;
  author: string;
  details: string;
  notice: string;
  constant: boolean;
  payable: boolean;
  stateMutability: 'pure' | 'payable';
  type: 'function' | 'constructor';
  params: {
      name: string;
      type: string;
      description: string;
      // Only for memory usage
      value?: any;
  }[];
  return: {
    description,
    outputs: {
      name: string,
      type: string,
      // Only for memory usage
      value?: any;
    }[];
  };

}
