import { google_translate } from "./translator/google_translator";
import { bing_translate } from "./translator/bing_translator";
abstract class Translate_service { 
    constructor() {
    }
    abstract translate_text(input: string, targetLanguage: string)
}

class Translate_service_openai extends Translate_service{
    override async translate_text(input: string, targetLanguage: string) {
        const url = 'https://translate.garethng.net/';

        if (input.length < 1) {
            throw new Error("error string");
        }

        const data = {
            "client_type": 1,
            "to_translate": input,
            "target_len": targetLanguage
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.text();
        const text = responseData.trim();

        return {text};
    }
}

class Translate_service_google_translate extends Translate_service{


    override async translate_text(input: string, targetLanguage: string) {
        try {
            return await google_translate(input, targetLanguage)
        } catch (exception) {
            throw new Error(`ERROR received: ${exception}\n`);
        }

    }
}

class Translate_service_bing_translate extends Translate_service{
    override async translate_text(input: string, targetLanguage: string) {
        try {
            return await bing_translate(input, {to: targetLanguage})
        } catch (exception) {
            throw new Error(`ERROR received: ${exception}\n`);
        } 
    }
}

enum translate_service_type {
    openai="openai",
    gtr = "gtr",
    bing = "bing"
  }

function translate(service: translate_service_type, input: string, targetLanguage: string) {
    let client: Translate_service
    switch (service){
        case translate_service_type.openai:
            client = new Translate_service_openai()
            break;
        case translate_service_type.gtr:
            client = new Translate_service_google_translate()
            break;
        case translate_service_type.bing:
            client = new Translate_service_bing_translate()
    }
    return client.translate_text(input, targetLanguage)
}

export {translate, translate_service_type}