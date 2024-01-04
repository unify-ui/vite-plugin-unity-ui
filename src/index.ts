import type { Plugin } from "vite";
import Inspect from "vite-plugin-inspect";

import unifyUiPlugin from "./vite-plugin-unify-ui.js";

export default function (options?: { inspect?: boolean }): Plugin[] {
  if (options?.inspect) {
    return [Inspect(), unifyUiPlugin()];
  }

  return [unifyUiPlugin()];
}
