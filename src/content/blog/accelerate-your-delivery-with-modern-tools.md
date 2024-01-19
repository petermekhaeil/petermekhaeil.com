---
title: Accelerate your delivery with modern tools
pubDate: 2022-12-27
description: Learn about how to use modern tooling to speed up your development, benefiting both the business and the development team.
tags:
  - javascript
  - npm
  - webdev
---

By using modern tools in the development of large front-end repositories, we can potentially improve the speed of deliverables. This will benefit both the business and the development team. The business will benefit from a faster time to market, and the development team will be more motivated as a faster pipeline reduces the need for context switching. I'll share 3 development tools that will lead to faster delivery of your development.

### Use a fast package manager

A fast package manager will improve developer productivity by reducing the time it takes to install packages and manage dependencies. This will lead to reducing build times and faster feature delivery.

[pnpm](https://pnpm.io/) is described as a fast, disk space-efficient package manager. It focuses on [saving disk space while boosting installation speed](https://pnpm.io/motivation).

pnpm is performant because it uses a [content-addressable store](https://pnpm.io/symlinked-node-modules-structure) that contains each version of each dependency and pnpm will hard link the project's `node_modules` to that store. This means that pnpm only stores one copy of each package in the store, regardless of how many projects are using it. This strategy will save disk space and improve the speed of installing and managing packages.

I've seen this result in projects speeding up their installations by **75%**. The team behind pnpm have also posted [benchmarks](https://pnpm.io/benchmarks) on how pnpm compares to other package managers in terms of installation speed.

### Migrate to a fast development tool

A fast development tool can reduce the time it takes to build and deploy. This can be particularly important for large applications that is frequently deployed.

[Vite](https://vitejs.dev/) is a modern JavaScript development tool that focuses on providing a fast and efficient development experience. It uses a new approach to building and serving web applications using native browser capabilities to load modules on demand, providing a faster and more efficient development experience.

One of the advantages Vite provides is how incredibly fast it is at building. Vite uses rollup for bundling and [esbuild](https://esbuild.github.io/) for transforming. Esbuild is written in Go and is 10-100x faster than the JavaScript-based alternatives.

Vite includes [Library Mode](https://vitejs.dev/guide/build.html#library-mode) that allows you to bundle libraries that do not have an HTML entry. Not only can you use Vite to build your applications, you can also take advantage of the power of Vite for packages that are consumed by those applications.

Swapping out a create-react-app (CRA) app to Vite is a matter of replacing the npm scripts and reconfiguring `vite.config.js` to match your needs. I've seen real world CRA apps migrate to Vite and have improved their build times by **50%**.

### Use a build system

Build systems like [Turborepo](https://turbo.build/repo) and [Nx](https://nx.dev/) can cache the results of tasks to speed up the build process in subsequent builds.

Each task in a CI pipeline has inputs and outputs - for example, a build task may have source code as inputs and bundled files as outputs. When a task is run, the build system generates a hash based on the inputs and stores the output under that hash. If the task is run again and the inputs have not changed, the build system can reuse the saved output stored under the same hash, rather than running the task again.

This can be especially helpful for large projects with many tasks, as it reduces the overhead of running tasks that have not changed, and can significantly reduce CI time.
