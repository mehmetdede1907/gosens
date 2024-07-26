import { parseTypeScriptFile } from './fileParser/parseTypeScript';
import { generateTestCases } from './testGenerator/generateTestCases';
import { createTestFile } from './testGenerator/createTestFile';
export async function generateUnitTest(filePath: string): Promise<void> {
  try {
    console.log(`Parsing file: ${filePath}`);
    const parsedFile = parseTypeScriptFile(filePath);

    console.log('Generating test cases...');
    const testCases = await generateTestCases(parsedFile);

    console.log('Creating test file...');
    createTestFile(filePath, testCases);

    console.log('Unit tests generated successfully!');
  } catch (error) {
    console.error('Error generating unit tests:', error);
    throw error;
  }
}

// CLI support
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Please provide a file path as an argument');
    process.exit(1);
  }
  generateUnitTest(filePath).catch(() => process.exit(1));
}