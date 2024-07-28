import {
  Storage
} from "@plasmohq/storage"


import {
  lan_eng
} from "~lan"


const apiKey = process.env.PLASMO_PUBLIC_OPENAI_API_KEY;
var targetLanguage = "" 

const storage = new Storage()
storage.watch({
  "target_lan": (target_lan) => {
    targetLanguage =  lan_eng[target_lan.newValue]
  },
})

storage.get("target_lan").then(target_lan => {
  targetLanguage =  lan_eng[target_lan]
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text) {
    translateWithOpenAI(request.text)
      .then((translatedText) => {
        sendResponse({ translatedText: translatedText });
      })
      .catch((error) => {
        console.error("Translation error:", error);
        sendResponse({ error: "翻译出错" });
      });

    return true; // 表示 sendResponse 将在异步操作完成后被调用
  } else {
    sendResponse({ error: "空文本无法翻译" });
    return true;
  }
});

async function translateWithOpenAI(text: string): Promise<string> {
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
