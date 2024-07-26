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

export function preparePrompt(parsedFile: ParsedFile & { fileContent: string }): string {
    let prompt = "Generate Jest unit tests for the following TypeScript code:\n\n";
  
    prompt += parsedFile.fileContent;
  
    prompt += `
  
Please generate Jest unit tests for the above code. Follow these guidelines:
1. Create a describe block for each function and class that exists in the provided code.
2. Write multiple test cases for each existing function and method, covering typical use cases, edge cases, and potential errors.
3. For existing classes, test the constructor and all methods.
4. Use jest.mock() only for external dependencies that are imported in the provided code.
5. Aim for high code coverage of the provided code only.
6. The response should contain only valid TypeScript code that can run without errors.
7. Do not include any explanations or comments outside of the code.
8. Start the file with necessary imports (import Jest and the functions/classes from the provided code).
9. Do not create or test any functions, classes, or dependencies that are not explicitly defined in the provided code.
10. Ensure all imports at the top of the test file match exactly with the imports in the original file.
11. If the original file has default exports, make sure to test those as well.
`;
    return prompt;
  }