# AI Input Translator
A browser extension that provides instant text translation with multiple translation services, built with [Plasmo Framework](https://docs.plasmo.com/).

## Features
- Multiple translation service providers (OpenAI, Google Translate, Bing Translate)
- Customizable trigger button (quick triple-press activation)
- User authentication with Firebase
- Multiple target language support
- Persistent settings storage
- Clean, modern UI with NextUI components

## Installation

### From Web Store
<!-- Add store links once published -->
- [Chrome Web Store]()
- [Firefox Add-ons]()
- [Edge Add-ons]()

### Local Development
1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Configure Firebase
- Create a Firebase project
- Add your Firebase configuration to environment variables:
```env
PLASMO_PUBLIC_FIREBASE_PUBLIC_API_KEY=
PLASMO_PUBLIC_FIREBASE_AUTH_DOMAIN=
PLASMO_PUBLIC_FIREBASE_PROJECT_ID=
PLASMO_PUBLIC_FIREBASE_STORAGE_BUCKET=
PLASMO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
PLASMO_PUBLIC_FIREBASE_APP_ID=
PLASMO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

3. Install dependencies
```bash
npm install
# or
pnpm install
```

4. Start the development server
```bash
npm run dev
# or
pnpm dev
```

5. Load the extension
- Chrome/Edge
  - Go to `chrome://extensions/`
  - Enable "Developer mode"
  - Click "Load unpacked"
  - Select the `build/chrome-mv3-dev` directory
- Firefox
  - Go to `about:debugging#/runtime/this-firefox`
  - Click "Load Temporary Add-on"
  - Select any file in the `build/firefox-mv2-dev` directory

## Usage
1. Sign in using the options page
2. Configure your preferences in the popup:
   - Select target language
   - Choose trigger button (Alt, Ctrl, Shift, or Space)
   - Select translation service (OpenAI, Google Translate, or Bing)
3. Triple-press your chosen trigger button to activate translation

## Development

### Key Files
- `popup.tsx`: Extension popup UI and settings
- `background.ts`: Background service worker for translation
- `utils/translate.ts`: Translation service implementations
- `utils/auth/`: Firebase authentication utilities
- `component/AuthForm.tsx`: User authentication UI

### Building for Production
```bash
npm run build
# or
pnpm build
```

Production files will be created in the `build` directory.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
[Add your chosen license]

## Acknowledgments
- Built with [Plasmo Framework](https://docs.plasmo.com/)
- UI components from [NextUI](https://nextui.org/)
- Authentication by [Firebase](https://firebase.google.com/)
- Translation services:
  - OpenAI
  - Google Translate
  - Bing Translate
