/**
 * Preprocesses Markdown content before rendering.
 * Converts simple HTML img tags into Markdown images so raw HTML can stay
 * disabled in the renderer.
 */
export function preprocessContent(content: string): string {
  if (!content) return "";

  let processedContent = content;

  // Convert HTML img tags to markdown format for better handling
  processedContent = processedContent.replace(
    /<img([^>]*?)src="([^"]*?)"([^>]*?)alt="([^"]*?)"([^>]*?)>/gi,
    (match, before, src, middle, alt, after) => {
      const titleMatch = (before + middle + after).match(/title="([^"]*)"/i);

      let markdownImg = `![${alt}](${src}`;

      if (titleMatch) {
        markdownImg += ` "${titleMatch[1]}"`;
      }

      markdownImg += ")";

      return markdownImg;
    },
  );

  // Handle img tags without alt text
  processedContent = processedContent.replace(
    /<img([^>]*?)src="([^"]*?)"([^>]*?)(?!alt=)>/gi,
    (match, before, src, after) => {
      // Check if alt is already present
      if (match.includes("alt=")) {
        return match;
      }

      const titleMatch = (before + after).match(/title="([^"]*)"/i);

      // Convert to markdown
      let markdownImg = `![Image](${src}`;

      if (titleMatch) {
        markdownImg += ` "${titleMatch[1]}"`;
      }

      markdownImg += ")";

      return markdownImg;
    },
  );

  // Clean up excessive whitespace but preserve intentional line breaks
  processedContent = processedContent
    .replace(/\n\s*\n\s*\n/g, "\n\n") // Multiple empty lines to double line break
    .replace(/[ \t]+/g, " ") // Multiple spaces/tabs to single space
    .trim();

  // Fix common HTML entities
  processedContent = processedContent
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return processedContent;
}

/**
 * Enhanced image component that handles both markdown and HTML img tags
 */
export function processImageContent(content: string): string {
  return preprocessContent(content);
}

export default preprocessContent;
