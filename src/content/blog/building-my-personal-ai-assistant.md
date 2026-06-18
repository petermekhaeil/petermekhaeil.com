---
title: Building my personal AI Assistant
pubDate: 2026-06-18
description: How I built a self-hosted AI assistant that connects to my daily life.
tags:
  - ai
---

I built an AI assistant that runs on my homelab. I named her Tatl, after the fairy from Majora's Mask.

In May I attended [AI Engineer Singapore](https://www.ai.engineer/singapore), Singapore Foreign minister Vivian Balakrishnan gave a keynote about his personal AI setup, a self-hosted assistant running on a Raspberry Pi. It was his second brain. He shared the setup in a [public gist](https://gist.github.com/VivianBalakrishnan/a7d4eec3833baee4971a0ee54b08f322).

It clicked so I had to build my own.

## What Tatl Can Do

Tatl connects to the services I use daily:

- **Gmail** - summarises yesterday's emails every morning
- **Google Calendar** - briefs me on today's agenda each morning
- **Garmin + Strava + Oura** - pull my fitness data and training plans on demand
- **Home Assistant** - check cameras
- **Homelab** - monitors services like Uptime Kuma and Grafana, sends alerts when something is down
- **Voice notes** - send a voice message and she transcribes it locally via [whisper.cpp](https://github.com/ggml-org/whisper.cpp)

The morning briefing means I can mute most of my notifications during the day.

Every message is processed with persistent memory. She builds up a knowledge graph over time and recalls relevant context before responding.

## Visualising the Wiki

The memory graph synthesises into markdown pages that Tatl writes and maintains. To browse them I use [Quartz](https://quartz.jzhao.xyz/) - a static site generator that turns markdown into an Obsidian-style website with graph view. Self-hosted privately.

## The Stack

Built on [NanoClaw](https://nanoclaw.dev/).

- Runs on the Mac Mini and handles message routing
- Each conversation spins up an isolated Docker container running Claude
- Credentials are managed through a local vault - containers never see API keys
- Memory is stored in a local knowledge graph via [mnemon](https://github.com/mnemon-dev/mnemon)
- Voice notes transcribed locally via [whisper.cpp](https://github.com/ggml-org/whisper.cpp)
- Wiki is visualised using [Quartz](https://quartz.jzhao.xyz/)

## What I learned

I tried local models first - Qwen, Mistral, Gemma. At the time, they weren't reliable enough for tool use. The ecosystem is moving fast though and I will revisit this.

The memory layer is what makes it feel different. Without it, it's just a chatbot with integrations.

## Get your own

[NanoClaw](https://nanoclaw.dev/) is open source and runs on anything from a Raspberry Pi to a Mac Mini.

- Get a Claude API key
- Start with [Telegram](https://nanoclaw.dev/skills/telegram) as the main messaging channel.

Then explore from there, you'll find yourself adding more of your day-to-day to it naturally.

The hardest part was finding a name for the agent.
