export function splitText(text: string) {
  const regex = /```([\s\S]*?)```/g;
  const codeBlocks = text.match(regex);
  const parts = text.split(regex).filter(Boolean);
  return { parts, codeBlocks };
}

export function escapeCodeBlock(text: string) {
  const regex = /(`|\|)([^`\\\n]*(?:\\.[^`\\\n]*)*)(`|\|)/g;
  return text.replace(regex, (match, p1, p2, p3) => {
    const escaped = p2.replace(/[\\`]/g, "\\$&");
    return `${p1}${escaped}${p3}`;
  });
}
