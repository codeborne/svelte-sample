# UI

Built with Svelte, TypeScript, Vite

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8000 to view it in the browser.

The page will reload if you make edits.

### npm check

Will run svelte-check to validate all types with TypeScript.

### npm test

Runs unit tests using Vitest.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

# Design

### Developing styles
Tailwind CSS is used as the CSS framework. For IntelliJ Idea, the `Tailwind CSS Smart Completions` plugin is recommended for autocompleting available utility classes.

### Icons
Tablericons
https://tablericons.com/

1. Copy svg code
2. Paste it to a new icon in the Icon.ts, strip the svg attribute and change it to a `<g>` to preserve some crucial attributes. Change the `stroke` hardcoded color to `currentColor`
