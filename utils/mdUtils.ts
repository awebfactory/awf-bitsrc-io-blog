import { walk } from "$std/fs/mod.ts";
import { Marked } from "markdown";

export async function readAllMD(source: string, target: string) {
  for await (const file of walk(source)) {
    if (file.isFile) {
      const markdown = await Deno.readTextFile(file.path);
      const markup = Marked.parse(markdown);
      // await saveMarkDownFile(markup.content, file.name, target);
      console.log(markup);
    }
  }
}
