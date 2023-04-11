import axios from "axios";
import { writeFile } from "fs/promises";

export async function downloadVoiceMessage(fileUrl: string) {
  const response2 = await axios.get(fileUrl, { responseType: "arraybuffer" });

  // Save the file to disk
  const filePath = `${fileUrl.split("/").pop()}`;
  await writeFile(filePath, Buffer.from(response2.data));

  return filePath;
}
