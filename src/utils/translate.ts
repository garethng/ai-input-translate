abstract class Translate_service { 
    constructor() {
    }
    abstract translate_text(text: string, targetLanguage: string)
}

class Translate_service_openai extends Translate_service{
    override async translate_text(text: string, targetLanguage: string): Promise<string> {
        const apiKey = process.env.PLASMO_PUBLIC_OPENAI_API_KEY;
        const url = 'https://openai.api2d.net/v1/chat/completions';
        const prompt = `Translate the following source text to {${targetLanguage}}, if the text contains an html tag, keep it. Output translation directly without any additional text.
        Source Text: {{${text}}}
        
        Translated Text:`;

        if (text.length <= 1) {
            throw new Error("error string");
        }

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
}

class Translate_service_google_translate extends Translate_service{


    override async translate_text(text: string, targetLanguage: string) {
        const sl = "auto";
        const tl = targetLanguage;
        const q = text
        const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=${sl}&tl=${tl}&q=${q}`
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': DEFAULT_USER_AGENT,
                },
                
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json();
            const translatedText = responseData.choices[0].message.content.trim();
    
            return translatedText;
        } catch (exception) {
            throw new Error(`ERROR received from ${url}: ${exception}\n`);
        }

    }
}

enum translate_service_type {
    openai="openai",
    gtr="gtr"
  }

function translate(service: translate_service_type, text: string, targetLanguage: string) {
    let client: Translate_service
    switch (service){
        case translate_service_type.openai:
            client = new Translate_service_openai()
            break;
        case translate_service_type.gtr:
            client = new Translate_service_google_translate()
            break;
    }
    return client.translate_text(text, targetLanguage)
}

export {translate, translate_service_type}