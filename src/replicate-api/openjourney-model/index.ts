import replicateAPI, { OpenJourneyModel } from "../config";

export const generateImage = async (prompt: string) => {
  try {
    
    if (!prompt.startsWith("mdjrny-v4 style")) {
      prompt = "mdjrny-v4 style " + prompt;
    }

    const openJourneyGeneratedImage = await replicateAPI.run(OpenJourneyModel, {
      input: {
        prompt,
        num_inference_steps: 30,
        guidance_scale: 7.5
      },
    }) as Array<string>;

    return openJourneyGeneratedImage[0]
  } catch (error) {
    throw error
  }
};
