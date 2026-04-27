import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCtHd1UQGCa5MLO1bFL70qVFMlqjpkq-24');

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
  await testModel('gemini-1.5-flash');
  await testModel('gemini-1.5-flash-latest');
  await testModel('gemini-1.5-pro');
  await testModel('gemini-pro');
}
run();
