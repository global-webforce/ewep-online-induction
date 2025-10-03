export function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function stripHtml(input: string): string {
  return input
    .replace(/(<([^>]+)>)/gi, "") // remove tags
    .replace(/&[^;]+;/g, ""); // remove entities
}
