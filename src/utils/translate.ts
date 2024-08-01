import { google_translate } from "./translator/google_translator";

abstract class Translate_service { 
    constructor() {
    }
    abstract translate_text(input: string, targetLanguage: string)
}

class Translate_service_openai extends Translate_service{
    override async translate_text(input: string, targetLanguage: string) {
        const apiKey = process.env.PLASMO_PUBLIC_OPENAI_API_KEY;
        const url = 'https://openai.api2d.net/v1/chat/completions';
        const prompt = `Translate the following source input to {${targetLanguage}}, if the input contains an html tag, keep it. Output translation directly without any additional input.
        Source Text: {{${input}}}
        
        Translated Text:`;

        if (input.length <= 1) {
            throw new Error("error string");
        }

        const data = {
            "messages": [
            { "role": "system", "content": prompt },
            { "role": "user", "content": input }
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
        const text = responseData.choices[0].message.content.trim();

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

enum translate_service_type {
    openai="openai",
    gtr="gtr"
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
    }
    return client.translate_text(input, targetLanguage)
}

export {translate, translate_service_type}