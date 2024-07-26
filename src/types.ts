// src/types.ts
export interface ParsedFile {
    imports: Import[];
    functions: Function[];
    classes: Class[];
    interfaces: Interface[];
  }
  
  export interface Import {
    path: string;
    importedItems: string[];
  }
  
  export interface Function {
    name: string;
    parameters: Parameter[];
    returnType: string;
  }
  
  export interface Class {
    name: string;
    methods: Function[];
    properties: Property[];
  }
  
  export interface Interface {
    name: string;
    properties: Property[];
  }
  
  export interface Parameter {
    name: string;
    type: string;
  }
  
  export interface Property {
    name: string;
    type: string;
  }
  