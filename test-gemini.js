import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('Error: API key not found. Please set VITE_GEMINI_API_KEY or GEMINI_API_KEY as an environment variable or use Node 20+ --env-file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say hi');
    console.log(`[SUCCESS] ${modelName}:`, result.response.text());
  } catch (err) {
    console.error(`[ERROR] ${modelName}:`, err.message);
  }
}

async function run() {
  await testModel('gemini-2.0-flash');
  await testModel('gemini-2.5-flash');
  await testModel('gemini-2.5-pro');
}
run();
