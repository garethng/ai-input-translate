 const lan = [
  { key: "en", label: `${chrome.i18n.getMessage("locale_en")}(English)` },
  { key: "de", label: `${chrome.i18n.getMessage("locale_de")}(Deutsch)` },
  { key: "es", label: `${chrome.i18n.getMessage("locale_es")}(Español)` },
  { key: "fr", label: `${chrome.i18n.getMessage("locale_fr")}(Français)` },
  { key: "it", label: `${chrome.i18n.getMessage("locale_it")}(Italiano)` },
  { key: "ja", label: `${chrome.i18n.getMessage("locale_ja")}(日本語)` },
  { key: "ko", label: `${chrome.i18n.getMessage("locale_ko")}(한국어)` },
  { key: "pt", label: `${chrome.i18n.getMessage("locale_pt")}(Português)` },
  { key: "pt_BR", label: `${chrome.i18n.getMessage("locale_pt_BR")}(Português (Brasil))` },
  { key: "zh_CN", label: `${chrome.i18n.getMessage("locale_zh_CN")}(简体中文)` },
  { key: "zh_TW", label: `${chrome.i18n.getMessage("locale_zh_TW")}(繁体中文)` },
]

const lan_eng = {
  "en": "English",
  "de": "German",
  "es": "Spanish",
  "fr": "French",
  "it": "Italian",
  "ja": "Japanese",
  "ko": "Korean",
  "pt": "Portuguese",
  "pt_BR": "Portuguese (Brazil)",
  "zh_CN": "Simplified Chinese",
  "zh_TW": "Traditional Chinese"
}


const TRIGGER_BUTTON = [
  { key: "space", actual_value: `${chrome.i18n.getMessage("trigger_button")}` },
  { key: "backslash", actual_value: "/" },
  { key: "equal", actual_value: "=" },
  { key: "semicolon", actual_value: ";" }
]

const service_name = [
  { key: "openai", label: "OpenAI" },
  { key: "gtr", label: "Google Translate" },
  { key: "deepl", label: "DeepL Translate" }
]

export { lan, lan_eng, TRIGGER_BUTTON, service_name };