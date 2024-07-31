import {
  Storage
} from "@plasmohq/storage"


import {
  lan_eng
} from "~const"

import { translate,translate_service_type } from "~utils/translate"

var targetLanguage = "" 
var trs_service = ""
const storage = new Storage()
storage.watch({
  "target_lan": (target_lan) => {
    targetLanguage =  target_lan.newValue
  },
  "translate_engine": (s) => {
    trs_service = s.newValue
  } 
})


storage.get("target_lan").then(target_lan => {
  targetLanguage =  target_lan
})

storage.get("translate_engine").then(s => {
  trs_service = s
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.text) {
    translate(translate_service_type[trs_service] ,request.text,targetLanguage)
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