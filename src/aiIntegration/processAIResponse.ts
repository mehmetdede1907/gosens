export function processAIResponse(aiResponse: string): string {
    // Remove any markdown code block syntax
    let processedResponse = aiResponse.replace(/```typescript|```/g, '').trim();
  
    // Ensure the response starts with imports
    if (!processedResponse.startsWith('import')) {
      processedResponse = `import { jest } from '@jest/globals';\n${processedResponse}`;
    }
  
    // Remove any non-code content (assuming anything after a line starting with '//' is a comment)
    processedResponse = processedResponse.split('\n').filter(line => !line.trimStart().startsWith('//')).join('\n');
  
    return processedResponse;
  }