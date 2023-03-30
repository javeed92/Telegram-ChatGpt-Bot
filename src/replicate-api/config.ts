import environment from "@/config/environment";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: environment.REPLICATE_API_TOKEN,
  userAgent: 'Inni/123'
});

export const OpenJourneyModel = "prompthero/openjourney:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb";


export default replicate
