import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import remarkStringify from "remark-stringify";

const startRegExp = /^:::\sraw\n$/;
const endRegExp = /^\n:::$/;

export async function changeMarkdownContent(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(() => (mdast: Root) => {
      visit(mdast, "paragraph", (node) => {
        visit(node, "text", (node) => {
          if (startRegExp.test(node.value)) {
            node.value = node.value + "<ClientOnly>\r\n" + '<div class="vp-raw">';
          }

          if (endRegExp.test(node.value)) {
            node.value = "</div>" + "\r\n</ClientOnly>" + node.value;
          }
        });
      });
    })
    .use(remarkStringify)
    .process(content);

  return result.toString().replace(/\\</g, "<");
}
