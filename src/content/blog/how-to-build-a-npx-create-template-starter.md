---
title: How to build an npx starter template
pubDate: 2022-09-05
description: Learn to build your own `npx create-my-template` script for your starter template.
tags:
  - javascript
  - npm
---

Our favourite frameworks have starter templates to help us get started with setting up our projects with minimal configuration. Some known examples:

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) (`npx create-react-app my-app`)
- [Next.js](https://nextjs.org/docs/api-reference/create-next-app) (`npx create-next-app@latest`)
- [Remix](https://remix.run/docs/en/v1#getting-started) (`npx create-remix@latest`)

I have created a [sample starter template](https://github.com/petermekhaeil/create-my-template) that I will walk through in this article.

**How they work**: these npm packages have an executable file configured in the `package.json`:

```json
{
  "name": "create-my-template",
  "version": "1.0.0",
  "bin": {
    "create-my-template": "./index.js"
  }
}
```

When the user installs the npm package, it will also install the executable configured in `bin`, allowing the user to run the executable:

```bash
$ npm install create-my-template
$ create-my-template
```

`npx` is part of `npm`: it allows you to run a command from an npm package. If the package has a single `bin` script configured, that command will be used. `npx` will also fetch the package remotely if it is not installed locally.

This means users run the below command and `npx` will download the package and run the executable in one line:

```bash
$ npx create-my-template
```

Now that we can execute a command, let's write up an installation script that will generate a starter template. A basic script can look like the one below:

```js
#!/usr/bin/env node

// Usage: npx create-my-template my-app

const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

// The first argument will be the project name.
const projectName = process.argv[2];

// Create a project directory with the project name.
const currentDir = process.cwd();
const projectDir = path.resolve(currentDir, projectName);
fs.mkdirSync(projectDir, { recursive: true });

// A common approach to building a starter template is to
// create a `template` folder which will house the template
// and the files we want to create.
const templateDir = path.resolve(__dirname, 'template');
fs.cpSync(templateDir, projectDir, { recursive: true });

// It is good practice to have dotfiles stored in the
// template without the dot (so they do not get picked
// up by the starter template repository). We can rename
// the dotfiles after we have copied them over to the
// new project directory.
fs.renameSync(
  path.join(projectDir, 'gitignore'),
  path.join(projectDir, '.gitignore')
);

const projectPackageJson = require(path.join(projectDir, 'package.json'));

// Update the project's package.json with the new project name
projectPackageJson.name = projectName;

fs.writeFileSync(
  path.join(projectDir, 'package.json'),
  JSON.stringify(projectPackageJson, null, 2)
);

// Run `npm install` in the project directory to install
// the dependencies. We are using a third-party library
// called `cross-spawn` for cross-platform support.
// (Node has issues spawning child processes in Windows).
spawn.sync('npm', ['install'], { stdio: 'inherit' });

console.log('Success! Your new project is ready.');
console.log(`Created ${projectName} at ${projectDir}`);
```

This is a basic example. Other things you will need to consider when you build your own:

- You can use tools like [commander](https://www.npmjs.com/package/commander) or [inquirer](https://www.npmjs.com/package/inquirer) to add interactive command-line interface.
- Add some error-handling. Examples: Does the project directory already exists before attempting to create it? Did the user specify the project name?
- Check which package manager the user prefers to use (eg pnpm, yarn).
- Add some styling using [chalk](https://www.npmjs.com/package/chalk).
- Do you want to initialize a git repository in the project directory?
- Should the installation script do a clean up if installation failed?

**Working on a monorepo?** This approach can also be used to create packages in your monorepo from a template!

Once you're happy with your starter template, you can [npm publish](https://docs.npmjs.com/cli/v6/commands/npm-publish) for everyone to use.

## Source code examples

A great way to learn is by reading the source code of other starter templates that are known across the community:

- [Astro](https://github.com/withastro/astro/tree/main/packages/create-astro) (`npm create astro@latest`)
- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/create-react-app) (`npx create-react-app my-app`)
- [Next.js](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) (`npx create-next-app@latest`)
- [Nuxt.js](https://github.com/nuxt/create-nuxt-app) (`npx create-nuxt-app my-app`)
- [SvelteKit](https://github.com/sveltejs/kit/tree/master/packages/create-svelte) (`npm create svelte@latest my-app`)
- [Remix](https://github.com/remix-run/remix/tree/main/packages/create-remix) (`npx create-remix@latest`)
- [Turborepo](https://github.com/vercel/turborepo/tree/main/packages/create-turbo) (`npx create-turbo@latest`)
- [Vue](https://github.com/vuejs/create-vue#create-vue) (`npm init vue@3`)
