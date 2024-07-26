export function processAIResponse(aiResponse: string): string {
    // Remove any markdown code block syntax
    let processedResponse = aiResponse.replace(/```typescript|```/g, '').trim();
  
    // Ensure the response starts with necessary imports
    if (!processedResponse.startsWith('import')) {
      processedResponse = `import { jest } from '@jest/globals';\n${processedResponse}`;
    }
  
    // Remove any non-code content (assuming anything after a line starting with '//' is a comment)
    processedResponse = processedResponse.split('\n').filter(line => !line.trimStart().startsWith('//')).join('\n');
  
    // Remove any imports of non-existent modules
    processedResponse = processedResponse.split('\n').filter(line => !line.includes("from './myModule'")).join('\n');
  
    return processedResponse;
  }