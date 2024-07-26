import { ParsedFile } from '../types';
import { preparePrompt } from '../aiIntegration/preparePrompt';
import { generateWithAI } from '../aiIntegration/openai';
import { processAIResponse } from '../aiIntegration/processAIResponse';

export async function generateTestCases(parsedFile: ParsedFile): Promise<string> {
  console.log('Preparing prompt based on parsed file...');
  const prompt = preparePrompt(parsedFile);

  console.log('Sending request to OpenAI...');
  const aiResponse = await generateWithAI(prompt);

  console.log('Processing AI response...');
  return processAIResponse(aiResponse);
}