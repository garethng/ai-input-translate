import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

let spaceCount = 0;

function focusin(event:Event) {
    let target: HTMLElement = event.target as HTMLElement
    if (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'text') || (target.tagName === 'DIV' && target.getAttribute('data-text-input') === 'true') || target.getAttribute("contenteditable") === 'true') {
        // 检查是否已经有翻译容器，如果没有则添加
        if (!target.dataset.listenerAdded) {
            target.dataset.listenerAdded = 'true';
            target.addEventListener('keydown', function (event) {
                if (event.key === ' ') {
                    spaceCount++;
                    if (spaceCount === 3) {
                        // 重置空格计数
                        spaceCount = 0;

                        // 移除多输入的三个空格
                        let textToTranslate = target.tagName === 'DIV' ? target.innerText : (target as HTMLInputElement).value;

                        let targetLanguage = "English";

                        // 显示动态等待符号
                        let originalText = textToTranslate;
                        let dotCount = 0;
                        let interval = setInterval(() => {
                            dotCount = (dotCount + 1) % 4;
                            let dots = '.'.repeat(dotCount);
                            if (target.tagName === 'DIV') {
                                target.innerText = originalText + dots;
                            } else {
                                (target as HTMLInputElement).value = originalText + dots;
                            }
                        }, 500); // 每500毫秒更新一次

                        if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
                            chrome.runtime.sendMessage({
                                text: textToTranslate,
                                targetLanguage: targetLanguage
                            }, function (response) {
                                // 停止动态等待符号
                                clearInterval(interval);

                                // 移除等待符号
                                if (target.tagName === 'DIV') {
                                    target.innerText = originalText;
                                } else {
                                    (target as HTMLInputElement).value = originalText;
                                }

                                if (response.error) {
                                    let errorTip = document.createElement('div');
                                    errorTip.innerText = '翻译出错';
                                    errorTip.style.color = 'red';
                                    errorTip.style.position = 'absolute';
                                    errorTip.style.zIndex = '1000';
                                    target.insertAdjacentElement('afterend', errorTip);
                                    setTimeout(() => errorTip.remove(), 3000);
                                } else {
                                    if (target.tagName === 'DIV') {
                                        target.innerText = response.translatedText;
                                    } else {
                                        (target as HTMLInputElement).value = response.translatedText;
                                    }
                                }
                            });
                        } else {
                            console.error("chrome.runtime.sendMessage is not available");
                        }
                    }
                } else {
                    // 如果按下的不是空格键，重置空格计数
                    spaceCount = 0;
                }
            });
        }
    }
}

document.addEventListener("focusin",focusin)