import { Configuration, OpenAIApi } from "openai";
import env from "../config/environment";

const configuration = new Configuration({
  apiKey: env.OPEN_AI_API_KEY,
});

const openaiAPI = new OpenAIApi(configuration);

export default openaiAPI
