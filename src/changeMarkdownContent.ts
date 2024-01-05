import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import remarkStringify from "remark-stringify";
import remarkFrontmatter from "remark-frontmatter";

const startRegExp = /^:::\sraw\n$/;
const endRegExp = /^\n:::$/;

export async function changeMarkdownContent(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => (mdast: Root) => {
      visit(mdast, ["paragraph"], (node) => {
        if (node.type === "paragraph") {
          visit(node, "text", (node) => {
            if (startRegExp.test(node.value)) {
              node.value = node.value + '<div class="vp-raw">';
            }

            if (endRegExp.test(node.value)) {
              node.value = "</div>" + node.value;
            }
          });
        }
      });
    })
    .use(remarkStringify)
    .process(content);

  return result.toString().replace(/\\</g, "<");
}
