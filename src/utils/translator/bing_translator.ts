import fetch from "node-fetch";
import test from "node:test";

interface TranslateOptions {
    from?: string;
    to?: string;
    host?: string;
    fetchOptions?: Partial<RequestInit>;
  }

const defaults: Required<Pick<TranslateOptions, 'from' | 'to' | 'host'>> = {
    from: '',
    to: 'en',
    host: 'api-edge.cognitive.microsofttranslator.com'
  };

export async function bing_translate(inputText:string, options?) {
    return new Translator(inputText, options).translate();
}

interface detectedLanguage {
    language: string;
    score: number;
  }
  
interface Translations {
    text: string;
    to: string;
    sentLen: {
        srcSentLen: number[],
        transSentLen: number[]
    }
  }

interface RawResponse {
    sentences: detectedLanguage;
    translations: Translations[];
  }

export class Translator{
    protected options: typeof defaults & TranslateOptions;
    constructor(protected inputText: string, options?: TranslateOptions) {
        this.options = Object.assign({}, defaults, options)
    }

    async translate() {
        const url = this.buildUrl()
        const token = await this.fetch_token();
        let l = []
        l.push({
            Text: this.inputText,
        })
        const res = await fetch(url, {
            method: "POST",
            headers: {
                accept: "*/*",
                "accept-language": "zh-TW,zh;q=0.9,ja;q=0.8,zh-CN;q=0.7,en-US;q=0.6,en;q=0.5",
                authorization: "Bearer " + token,
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                "sec-ch-ua": '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
                
            },
            body:JSON.stringify(l)
        });
        if (!res.ok) throw new Error(`Translate error ${res.statusText}`)
        try {
            const raw = await res.json() as RawResponse[]
            const text = this.buildResText(raw[0]);
            return { raw, text };
        }
        catch {
            return {};
        }
        
        
    }

    protected buildUrl() {
        const { host, from, to } = this.options;
        return [
            `https://${host}/translate`,
            '?api-version=3.0',
            `&from=${from}`,
            `&to=${to}`,
            "&includeSentenceLength=true"
        ].join('');
    }
    
    private async fetch_token() {
        const tokenURL = 'https://edge.microsoft.com/translate/auth'
        const res = await fetch(tokenURL, {
            method: "GET",
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42',
            },
        })
        if (res.ok) {
            const token = await res.text()
            return token
        } else {
            throw new Error("fetch Token error")
        }
    }
    
    protected buildBody() {
        const { from, to } = this.options;
        const params = {
            Text: this.inputText,
        };
        return new URLSearchParams(params).toString();
    }
    
    protected buildResText(raw:RawResponse) {
       return raw.translations[0].text
    }
}