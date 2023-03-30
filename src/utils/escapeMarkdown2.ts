export function splitCodeBlock(text: string) {
  const codeBlockRegex = /([\s\S]*?)(```[\s\S]*?```[\n]?)([\s\S]*)/;
  const parts = text.split(codeBlockRegex);

  return parts;
}

export function escapeCodeBlock(text: string) {
  const regex = /(`|\|)([^`\\\n]*(?:\\.[^`\\\n]*)*)(`|\|)/g;
  return text.replace(regex, (match, p1, p2, p3) => {
    const escaped = p2.replace(/[\\`]/g, "\\$&");
    return `${p1}${escaped}${p3}`;
  });
}
