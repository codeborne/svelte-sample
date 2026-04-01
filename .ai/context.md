# Project AI Context

## Project Overview
This is a Svelte 5 web application with a modern UI framework.

## Technical Stack
- **Frontend Framework**: Svelte 5 (Runes mode)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure
- `/ui` - Main application directory
  - `/src` - Source code
  - `/public` - Static assets
  - `/build` - Build output
  - `/i18n` - Internationalization files

## Code Conventions
- Use Svelte 5 Runes syntax for reactivity
- Follow TypeScript strict mode guidelines
- Use camelCase for variable and function names
- Use single quotes for strings
- All components are `.svelte` files
- Use Tailwind CSS for styling

## Common Patterns
- Components use TypeScript interfaces for props
- Internationalization (i18n) is implemented throughout
- Reactive state management using Svelte stores
- Component-based architecture with clear separation of concerns

## Important Notes for AI
- Always use Svelte 5 Runes syntax (not Svelte 4)
- Avoid deprecated Svelte features (e.g $$slots, $$restProps etc.)
- Ensure TypeScript type safety
- Follow existing component patterns
- Use Tailwind classes for styling
- Consider i18n requirements
- Maintain existing error handling patterns
- Follow existing folder structure conventions

## Example Component Structure
```svelte
<script lang="ts">
  import type {ComponentProps} from '../types'

  interface Props {
    property: string
  }

  let {property} = $props<Props>()
  let state = $state(initialValue)
</script>

<div class="tailwind-classes">
  {state}
</div>

<style lang="postcss">
  @reference "../global.css";
  /* Tailwind CSS is used, minimal custom styles */
</style>
```

## Testing
- This is a UX/UI prototype, no need to write tests unless specifically requested


# Accessibility Regulation Context
- Accessibility-related code and UX decisions must align with the latest EU accessibility legal text that is **in force
  ** for the implemented scope.
- Current in-force baseline reference (as of 2026-03-09):
  - **Directive (EU) 2019/882** of the European Parliament and of the Council of 17 April 2019 on the accessibility
    requirements for products and services (Text with EEA relevance), **PE/81/2018/REV/1**.
  - ELI/EUR-Lex reference: `https://eur-lex.europa.eu/eli/dir/2019/882/oj`
- For accessibility-sensitive implementation prompts, verify the latest in-force EUR-Lex status before finalizing
  changes.
- Keep concrete dates in mind for applicability where relevant (the directive applies from **28 June 2025** per EUR-Lex
  summary).
