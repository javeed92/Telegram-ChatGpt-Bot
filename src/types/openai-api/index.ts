import { CreateCompletionResponseUsage } from "openai";

export interface ChatCompletionResponse {
    text: string | null,
    usage: CreateCompletionResponseUsage | null
}