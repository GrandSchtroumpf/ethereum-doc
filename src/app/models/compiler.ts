export interface EthMetadata {
  compiler: string;
  languare: 'Solidity';
  output: {
    abi: ABIDefinition[];
    devdoc: Devdoc;
    userDoc: Userdoc;
    settings: any;
    sources: any;
  };
}


/**
 * COMPILATION RESULT
 */

export interface CompilationResult {
  data: {
    contracts: {
      [contractTarget: string]: {
        [contractName: string]: Contract;
      }
    }
  };
  source: {
    sources: {
      [contractTarget: string]: { content: string; }
    }
    target: string;
  };
}

export interface Contract {
  abi: ABIDefinition[];
  devdoc: Devdoc;
  evm: any;
  metadata: string;
  userdoc: Userdoc;
}

export interface Devdoc {
  title: string;
  author: string;
  methods: {
    [methodName: string]: {
      details: string;
      return: string;
    }
  };
}

export interface Userdoc {
  notice: string;
  methods: {
    [methodName: string]: {
      notice: string;
    }
  };
}

/**
 * ABI
 */

export interface ABIDefinition {
  constant?: boolean;
  payable?: boolean;
  anonymous?: boolean;
  inputs?: Array<{ name: string; type: ABIDataTypes; indexed?: boolean }>;
  name?: string;
  outputs?: Array<{ name: string; type: ABIDataTypes }>;
  type: "function" | "constructor" | "event" | "fallback";
}

export type ABIDataTypes = "uint256" | "boolean" | "string" | "bytes" | string; // TODO complete list
