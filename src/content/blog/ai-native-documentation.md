---
title: AI Native Documentation
pubDate: 2025-12-30
description: Documentation teams are adapting to AI crawlers. Here are techniques they're using to make their docs AI native.
tags:
  - ai
  - documentation
---

Most documentation traffic now comes from AI crawlers and agents read docs more than humans do. Here's how teams are adapting.

## Render Markdown for Agents

Agents send `Accept: text/markdown` in the request header when fetching pages. Servers can detect this and return markdown instead of HTML. Less tokens, cleaner content.

[Bun](https://x.com/bunjavascript/status/1971934734940098971) and [@thdxr](https://x.com/thdxr/status/1972421466953273392) shared this pattern.

## AI Prompts

Docs now include AI prompts you can paste directly into your agent to handle setup.

Examples:

- [Clerk Docs](https://clerk.com/docs/nextjs/getting-started/quickstart)
- [Sentry Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Supabase Docs](https://supabase.com/docs/guides/getting-started/ai-prompts)

## Ask AI

Docs sites embed AI chat as a sidebar or popup. Many are powered by [Kapa](https://www.kapa.ai/).

Examples:

- [Cursor Docs](https://cursor.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)

## Copy Page as Markdown

Make it one click to copy documentation as markdown.

[Cursor](https://cursor.com/docs) and [Vercel](https://vercel.com/docs) do this with a "Copy page" link in the sidebar.

## Markdown URL Support

Append `.md` to a documentation URL to get the page rendered as markdown. [nuqs](https://nuqs.47ng.com/docs) does this and includes a "Copy Markdown URL" button along with "Open in..." options to open the markdown URL directly in ChatGPT or Claude.

## llms.txt

Put a [llms.txt](https://llmstxt.org/) in the root. Some sites include links to key docs, others include the full content in markdown format.

Examples:

- [nextjs.org/docs/llms.txt](https://nextjs.org/docs/llms.txt)
- [tanstack.com/llms.txt](https://tanstack.com/llms.txt)
- [ui.shadcn.com/llms.txt](https://ui.shadcn.com/llms.txt)

Some sites provide both `llms.txt` and `llms-full.txt` files.

## MCP Servers

Projects run their own MCP servers for documentation, like [Astro Docs MCP Server](https://docs.astro.build/en/guides/build-with-ai/#astro-docs-mcp-server). [Context7](https://context7.com/) works across documentation for many tools and libraries.
