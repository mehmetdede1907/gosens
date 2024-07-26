import * as fs from 'fs';
import * as path from 'path';

export function createTestFile(originalFilePath: string, testContent: string): void {
  const dir = path.dirname(originalFilePath);
  const basename = path.basename(originalFilePath, '.ts');
  const testFilePath = path.join(dir, `${basename}.test.ts`);

  fs.writeFileSync(testFilePath, testContent);
  console.log(`Test file created: ${testFilePath}`);
}