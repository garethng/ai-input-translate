import { translate } from '@vitalets/google-translate-api';

export async function google_translate(text: string, to: string) {
    return await translate(text, { to: to })
}