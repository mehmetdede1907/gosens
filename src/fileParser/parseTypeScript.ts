import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { ParsedFile, Import, Function, Class, Interface, Parameter, Property } from '../types';

export function parseTypeScriptFile(filePath: string): ParsedFile {
  console.log(`Attempting to parse file: ${filePath}`);
  console.log(`Current working directory: ${process.cwd()}`);
  
  const absolutePath = path.resolve(filePath);
  console.log(`Absolute file path: ${absolutePath}`);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File does not exist: ${absolutePath}`);
  }

  const program = ts.createProgram([absolutePath], {});
  const sourceFile = program.getSourceFile(absolutePath);

  if (!sourceFile) {
    throw new Error(`Could not find source file: ${absolutePath}`);
  }

  const parsedFile: ParsedFile = {
    imports: [],
    functions: [],
    classes: [],
    interfaces: [],
  };

  ts.forEachChild(sourceFile, (node) => {
    try {
      if (ts.isImportDeclaration(node)) {
        parsedFile.imports.push(parseImport(node));
      } else if (ts.isFunctionDeclaration(node)) {
        const func = parseFunction(node);
        if (func) parsedFile.functions.push(func);
      } else if (ts.isClassDeclaration(node)) {
        const cls = parseClass(node);
        if (cls) parsedFile.classes.push(cls);
      } else if (ts.isInterfaceDeclaration(node)) {
        const intf = parseInterface(node);
        if (intf) parsedFile.interfaces.push(intf);
      }
    } catch (error) {
      console.error(`Error parsing node:`, error);
    }
  });

  return parsedFile;
}

function parseImport(node: ts.ImportDeclaration): Import {
  const path = (node.moduleSpecifier as ts.StringLiteral).text;
  const importedItems: string[] = [];

  if (node.importClause) {
    if (node.importClause.name) {
      importedItems.push(node.importClause.name.text);
    }
    if (node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
      node.importClause.namedBindings.elements.forEach((element) => {
        importedItems.push(element.name.text);
      });
    }
  }

  return { path, importedItems };
}

function parseFunction(node: ts.FunctionDeclaration | ts.MethodDeclaration): Function | null {
  if (!node.name) {
    console.warn('Function or method without a name encountered');
    return null;
  }
  const name = node.name.getText();
  const parameters = node.parameters.map(parseParameter).filter((p): p is Parameter => p !== null);
  const returnType = node.type ? node.type.getText() : 'any';

  return { name, parameters, returnType };
}

function parseClass(node: ts.ClassDeclaration): Class | null {
  if (!node.name) {
    console.warn('Class without a name encountered');
    return null;
  }
  const name = node.name.getText();
  const methods: Function[] = [];
  const properties: Property[] = [];

  node.members.forEach((member) => {
    if (ts.isMethodDeclaration(member)) {
      const method = parseFunction(member);
      if (method) methods.push(method);
    } else if (ts.isPropertyDeclaration(member)) {
      const property = parseProperty(member);
      if (property) properties.push(property);
    }
  });

  return { name, methods, properties };
}

function parseInterface(node: ts.InterfaceDeclaration): Interface | null {
  const name = node.name.getText();
  const properties: Property[] = [];

  node.members.forEach((member) => {
    if (ts.isPropertySignature(member)) {
      const property = parseProperty(member);
      if (property) properties.push(property);
    }
  });

  return { name, properties };
}

function parseParameter(node: ts.ParameterDeclaration): Parameter | null {
  if (!node.name) {
    console.warn('Parameter without a name encountered');
    return null;
  }
  const name = node.name.getText();
  const type = node.type ? node.type.getText() : 'any';
  return { name, type };
}

function parseProperty(node: ts.PropertyDeclaration | ts.PropertySignature): Property | null {
  if (!ts.isIdentifier(node.name)) {
    console.warn('Property with non-identifier name encountered');
    return null;
  }
  const name = node.name.getText();
  const type = node.type ? node.type.getText() : 'any';
  return { name, type };
}