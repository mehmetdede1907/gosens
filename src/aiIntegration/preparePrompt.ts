import { ParsedFile, Function, Class, Interface } from '../types';

function formatFunction(func: Function): string {
  const params = func.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
  return `function ${func.name}(${params}): ${func.returnType}`;
}

function formatClass(cls: Class): string {
  let result = `class ${cls.name} {\n`;
  cls.properties.forEach(prop => {
    result += `  ${prop.name}: ${prop.type};\n`;
  });
  cls.methods.forEach(method => {
    const params = method.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
    result += `  ${method.name}(${params}): ${method.returnType} {}\n`;
  });
  result += '}';
  return result;
}

function formatInterface(intf: Interface): string {
  let result = `interface ${intf.name} {\n`;
  intf.properties.forEach(prop => {
    result += `  ${prop.name}: ${prop.type};\n`;
  });
  result += '}';
  return result;
}

export function preparePrompt(parsedFile: ParsedFile): string {
  let prompt = "Generate Jest unit tests for the following TypeScript code:\n\n";

  parsedFile.functions.forEach(func => {
    prompt += formatFunction(func) + "\n\n";
  });

  parsedFile.classes.forEach(cls => {
    prompt += formatClass(cls) + "\n\n";
  });

  parsedFile.interfaces.forEach(intf => {
    prompt += formatInterface(intf) + "\n\n";
  });

  prompt += `
Please generate Jest unit tests for the above code. Follow these guidelines:
1. Create a describe block for each function and class.
2. Write multiple test cases for each function and method, covering typical use cases, edge cases, and potential errors.
3. For classes, test the constructor and all methods.
4. Use jest.mock() for any external dependencies (assume all imports are external).
5. Aim for high code coverage.
6. The response should contain only valid TypeScript code that can run without errors.
7. Do not include any explanations or comments outside of the code.
8. Start the file with necessary imports and end with any required export statements.
`;

  return prompt;
}