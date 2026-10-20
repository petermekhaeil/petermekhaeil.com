---
title: Building a small coding agent
pubDate: 2026-10-20
description: Notes on building a small coding agent.
---

I have been wanting to see how coding agents work so I set off to build one myself.

Geoff Huntley inspired me back at AI Engineer Singapore in his talk. In his [recent post](https://ghuntley.com/replaced/) he wrote:

> The most concrete task I can recommend is for software developers to build their own agent, learn the magic tricks behind Claude Code, and explain how it works under the hood.

You can follow along, I am calling it [mini-agent](https://github.com/petermekhaeil/mini-agent).

## Where I started

I started by reading Geoff's [blog post](https://ghuntley.com/agent/) on building an agent and Nader's [You Could've Invented Claude Code](https://x.com/dabit3/status/2009668398691582315). Geoff also has a [workshop](https://github.com/ghuntley/how-to-build-a-coding-agent) written in Go.

## The loop

I have two loops running. They are simplified for the post.

The outer loop is the CLI:

```ts
// cli.ts
while (true) {
    const request = await getInput();
    const result = await runRequest(request);
    print(result);
}
```

The inner loop is the agent:

```ts
// loop.ts
while (true) {
    const assistant = await callModel(messages);

    if (assistant.tool_calls.length === 0)
        return { answer: assistant.content, messages };

    for (const call of assistant.tool_calls) {
        messages.push(await executeTool(call));
    }
}
```

The agent loop will send messages to the model and the model will ask for a tool call. The agent will run the tool and send it back. I end the loop when the model stops asking for a tool and that's the final answer.

So what is an agent? An agent is a loop around a model that keeps going until a goal is complete.

## The tools

A tool is a function that connects the agent with the outside world. The tool description is how the model knows when to use it. As I built out mini-agent I learned that it comes down to these tools:

- list_files
- read_file
- code_search
- edit_file
- bash

As I keep building, the list may shrink or it may grow. I do wonder if all I need is just bash?

## Watching the tokens

I needed a way to measure tokens so I added a token meter:

```bash
[turn 1] ctx 728 (cached 0) · out 56 · total 784
[turn 2] ctx 3,052 (cached 0) · out 71 · total 3,907
[turn 3] ctx 9,779 (cached 3,049) · out 28 · total 13,714
[turn 4] ctx 10,571 (cached 9,776) · out 35 · total 24,320
[turn 5] ctx 10,881 (cached 10,568) · out 29 · total 35,230
[turn 6] ctx 12,784 (cached 10,878) · out 28 · total 48,042
[turn 7] ctx 13,395 (cached 12,781) · out 434 · total 61,871
```

The meter is printed after each call and having it printed out I learned how quickly it adds up. Every turn resends the whole conversation.

## Asking it to fix itself

Now this is when it got really impressive and got me excited. I found a bug where a failed request killed the whole process and I lost the conversation. So I asked `mini-agent`:

```bash
You: this agent exits when a request fails. find out why, fix it, add a test, run bun test.
```

The agent took its turns, reading the right files and then asking for approval to make the code changes. It then ran the tests.

It wasn't perfect and there is definitely room for improvement. But more importantly, I watched it run a loop to achieve a goal.

## Fixing the agent so it could fix itself

The first run took 24 turns. It kept asking me to approve `sed` commands to read a few lines. I realised that was because `read_file` was doing full file reads and the agent only wanted a range of lines, so I added line ranges to the tool.

The next run with the same prompt took 13 turns instead of 24, and about 127k tokens instead of 462k.

Learnt that it's not the model that gets smarter, it's just I gave it better tools to work with.

## What I learned

Every wasted turn told me what to build next.

I was more impressed that we can write software that repairs itself. I'm starting to understand this now.

While building this, I also realised why tracing in coding agents is important to measure usage, and what better way to learn than to build my own. Stay tuned.
