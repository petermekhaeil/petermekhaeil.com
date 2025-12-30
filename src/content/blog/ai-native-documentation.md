---
title: AI Native Documentation
pubDate: 2025-12-30
description: Documentation teams are adapting to AI crawlers. Here are techniques they're using to make their docs AI native.
tags:
  - ai
  - documentation
---

Most documentation traffic now comes from AI crawlers. Agents now read docs more than humans do.

Here's how documentation teams are adapting.

## Render Markdown for Agents

Agents request `text/markdown` when fetching pages. Providing markdown reduces tokens and gives agents cleaner content to work with.

[Bun](https://x.com/bunjavascript/status/1971934734940098971) and [SST](https://x.com/thdxr/status/1972421466953273392) noticed this pattern. When an agent sends `Accept: text/markdown` in the request header, the server can return the page as markdown instead of HTML.

## AI Prompts

Docs now include AI prompts you can paste directly into your agent to handle setup.

Examples:

- [supabase.com/docs/guides/getting-started/ai-prompts](https://supabase.com/docs/guides/getting-started/ai-prompts)
- [clerk.com/docs/nextjs/getting-started/quickstart](https://clerk.com/docs/nextjs/getting-started/quickstart)
- [docs.sentry.io/platforms/javascript/guides/nextjs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

PostHog built a [wizard CLI](https://posthog.com/blog/envoy-wizard-llm-agent) that takes this further. The CLI interacts directly with agents to handle setup automatically.

## Ask AI

Docs sites now embed AI chat as a sidebar or popup. Users get instant answers without leaving the page. Many are powered by [Kapa](https://www.kapa.ai/).

Examples:

- [cursor.com/docs](https://cursor.com/docs)
- [vercel.com/docs](https://vercel.com/docs)
- [prisma.io/docs](https://www.prisma.io/docs)

## Copy Page as Markdown

Make it one click to copy documentation as markdown. Don't make agents or users work to extract the content.

[Cursor](https://cursor.com/docs) and [Vercel](https://vercel.com/docs) do this well with a "Copy page" link in the sidebar.

## llms.txt

[llmstxt.org](https://llmstxt.org/) proposes a standard: put a `/llms.txt` file at your site's root. Some sites include links to key docs, others include the full content in markdown format.

Examples:

- [ui.shadcn.com/llms.txt](https://ui.shadcn.com/llms.txt)
- [nextjs.org/docs/llms.txt](https://nextjs.org/docs/llms.txt)

Some sites provide both `llms.txt` and `llms-full.txt` files. AI tools auto-discover these when you provide the docs URL as a source.

## MCP Servers

Projects run their own MCP servers for documentation, like [Astro Docs MCP Server](https://docs.astro.build/en/guides/build-with-ai/#astro-docs-mcp-server). [Context7](https://context7.com/) works across documentation for many tools and libraries.
