import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = 'sk-proj-CsakyUVrqI50naWpA23MT3BlbkFJp3eDILa8wSZdFd53X53Q';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the environment variables');
}

export async function generateWithAI(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',  // Using GPT-4 for better code generation
        messages: [
          { role: 'system', content: 'You are an expert TypeScript developer specializing in writing comprehensive unit tests using Jest.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}