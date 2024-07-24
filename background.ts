import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.PLASMO_PUBLIC_OPENAI_API_KEY;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text && request.targetLanguage) {
    translateWithOpenAI(request.text, request.targetLanguage)
      .then((translatedText) => {
        sendResponse({ translatedText: translatedText });
      })
      .catch((error) => {
        console.error("Translation error:", error);
        sendResponse({ error: "翻译出错" });
      });

    return true; // 表示 sendResponse 将在异步操作完成后被调用
  }
});

async function translateWithOpenAI(text: string, targetLanguage: string): Promise<string> {
  const url = 'https://openai.api2d.net/v1/chat/completions';

  const prompt = `Translate the following text to ${targetLanguage} in a natural and conversational tone. Provide only the translated text without any punctuation marks. If the original text has punctuation marks, please keep them.`;

  const data = {
    "messages": [
      { "role": "system", "content": prompt },
      { "role": "user", "content": text }
    ],
    "model": "gpt-3.5-turbo",
    "temperature": 0.3
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  const translatedText = responseData.choices[0].message.content.trim();

  return translatedText;
}
