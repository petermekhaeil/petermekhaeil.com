---
title: Adding Dark Mode to your Tailwind CSS website
pubDate: 2020-11-30
description: How to add Dark Mode to your Tailwind CSS website.
tags:
  - javascript
  - tailwindcss
devto: https://dev.to/petermekhaeil/adding-dark-mode-to-your-tailwind-css-website-47m7
---

Tailwind CSS v2.0 introduces [Dark mode support](https://tailwindcss.com/docs/dark-mode) and with minimal JS and inline SVG, you can allow your users to manually toggle Dark Mode. We are going to walk through what is required to build the same one from [petermekhaeil.com](https://petermekhaeil.com).

Set `darkMode` to `class` in your config:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class'
};
```

What we want to do is toggle the `dark` class on the `<html>` element. When this class appears on your tree, any child elements below it with the `dark:` will be applied.

Let's start with a base HTML page:

```html
<html>
  <body class="bg-white text-black dark:bg-black dark:text-white">
    <h1>My Website</h1>
  </body>
</html>
```

Let's add the UI switch using SVGs from [Heroicons](https://heroicons.com/). We will be using the Moon and Sun SVGs. They also have IDs attached `#toggle-dark` and `#toggle-light`. You'll also noticed they are hidden using the `hidden` class. This is because we would like to avoid any flicker while the app decides which SVG to show (more on this later).

```html
<html>
  <body class="bg-white text-black dark:bg-black dark:text-white">
    <h1>My Website</h1>
    <!-- Moon SVG from Heroicons -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="hidden h-6 w-6 cursor-pointer"
      id="toggle-dark">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
    <!-- Sun SVG from Heroicons -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="hidden h-6 w-6 cursor-pointer"
      id="toggle-light">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </body>
</html>
```

We will check if the user has dark mode enabled in their browser. If enabled, then toggle the correct SVG to appear and add the `dark` class to `<html>`:

```js
var userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
var toggleDark = document.getElementById('toggle-dark');
var toggleLight = document.getElementById('toggle-light');
var htmlElem = document.querySelector('html');

if (userPrefersDark.matches)) {
  htmlElem.classList.add('dark');
  toggleDark.classList.add('visible');
  toggleLight.classList.remove('hidden');
} else {
  toggleLight.classList.add('visible');
  toggleDark.classList.remove('hidden');
}
```

Let's now add some event handlers to the SVGs to toggle dark mode on/off:

```js
toggleLight.addEventListener('click', function () {
  localStorage.setItem('theme', 'light');
  htmlElem.classList.remove('dark');
  toggleDark.classList.add('visible');
  toggleDark.classList.remove('hidden');
  toggleLight.classList.add('hidden');
  toggleLight.classList.remove('visible');
});

toggleDark.addEventListener('click', function () {
  localStorage.setItem('theme', 'dark');
  htmlElem.classList.add('dark');
  toggleLight.classList.add('visible');
  toggleLight.classList.remove('hidden');
  toggleDark.classList.add('hidden');
  toggleDark.classList.remove('visible');
});
```

One last thing we need to do is store the users preference - we want to do this otherwise when they navigate from one page to another, the setting will reset. We will use `localStorage` to store the `theme`. Replace the above JS blocks with this final JS:

```js
var theme = localStorage.getItem('theme');
var userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
var toggleDark = document.getElementById('toggle-dark');
var toggleLight = document.getElementById('toggle-light');
var htmlElem = document.querySelector('html');

if (theme === 'dark' || (!theme && userPrefersDark.matches)) {
  htmlElem.classList.add('dark');
  toggleDark.classList.add('visible');
  toggleLight.classList.remove('hidden');
} else {
  toggleLight.classList.add('visible');
  toggleDark.classList.remove('hidden');
}

toggleLight.addEventListener('click', function () {
  localStorage.setItem('theme', 'light');
  htmlElem.classList.remove('dark');
  toggleDark.classList.add('visible');
  toggleDark.classList.remove('hidden');
  toggleLight.classList.add('hidden');
  toggleLight.classList.remove('visible');
});

toggleDark.addEventListener('click', function () {
  localStorage.setItem('theme', 'dark');
  htmlElem.classList.add('dark');
  toggleLight.classList.add('visible');
  toggleLight.classList.remove('hidden');
  toggleDark.classList.add('hidden');
  toggleDark.classList.remove('visible');
});
```

You can view the [source code](https://github.com/petermekhaeil/petermekhaeil.com/blob/master/src/_includes/base.njk) to see it all put together.

### @tailwindcss/typography

If you use [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin), you'll need to add some configs to get dark mode working.

Add a `dark:prose-dark` class. This will only work when placed next to `prose`.

```html
<article class="prose dark:prose-dark"></article>
  <h1>Cannot believe adding Dark Mode is this simple!</h1>
</article>
```

Extend your configuration to add a dark [theme](https://tailwindcss.com/docs/theme):

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // ...
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.200')
          }
        }
      })
    }
  },
  variants: {
    typography: ['responsive', 'dark']
  },
  plugins: [require('@tailwindcss/typography')]
};
```

If you've previously extended your theme for Tailwind CSS 1.x, for Tailwind CSS 2.0 you'll need to [update default theme key to DEFAULT](https://tailwindcss.com/docs/upgrading-to-v2#update-default-theme-keys-to-default).

You will then need to extend the rest of your styles. [Use this blog's config as an example](https://github.com/petermekhaeil/petermekhaeil.com/blob/master/tailwind.config.js).
