import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { keys } from "../keys";

const openai = createOpenAI({
  apiKey: keys().OPENAI_API_KEY,
  compatibility: "strict",
});

const anthropic = createAnthropic({
  apiKey: keys().ANTHROPIC_API_KEY,
});

export const models = {
  chat: openai("gpt-4o-mini"),
  code: anthropic("claude-3-7-sonnet-20250219"),
  embeddings: openai("text-embedding-3-small"),
};
