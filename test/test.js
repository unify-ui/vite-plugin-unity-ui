import fs from "node:fs";
import url from "node:url";
import { changeMarkdownContent } from "../dist/changeMarkdownContent.js";

const markdownFilePath = url.fileURLToPath(new URL("./markdown.md", import.meta.url));
const text = fs.readFileSync(markdownFilePath, "utf8");

const content = await changeMarkdownContent(text);
console.log(content);
