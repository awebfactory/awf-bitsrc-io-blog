import { walk } from "$std/fs/mod.ts";
import { encode } from "$std/encoding/hex.ts";
import { Marked } from "markdown";
import { Search } from "./search.ts";

export async function readAllMD(source: string, target: string) {
  for await (const file of walk(source)) {
    if (file.isFile) {
      const markdown = await Deno.readTextFile(file.path);
      const markup = Marked.parse(markdown);
      await saveMarkDownFile(markup.content, file.name, target);
      console.log("markup: ", markup);
    }
  }
}

function pageTemplate(html: string) {
  return `
    import SearchBar from "../../islands/SearchBar.tsx"
    export default function Page() {
      return (
        <div style="padding: 10px; width: 90%; margin: 0 auto;">
         <SearchBar ></SearchBar>
          ${html}
        </div>
      );
    }
`;
}

async function saveMarkDownFile(
  content: string,
  fname: string,
  targetFolder: string,
) {
  //rename the file from .md to .tsx
  let fnameParts = fname.split(".");
  fnameParts.pop();

  const fileUrl = "/blog/" + fnameParts.join(".");
  const mySearch = Search.getInstance();
  mySearch.indexElement(content, fileUrl);

  fnameParts.push("tsx");

  const destination = targetFolder + "/" + fnameParts.join(".");

  const encoder = new TextEncoder();
  let targetHash = "";

  content = pageTemplate(content);
  const sourceHash = encode(
    new Uint8Array(
      await crypto.subtle.digest("sha-1", encoder.encode(content)),
    ),
  ).toString();
  try {
    const targetFile = await Deno.readTextFile(destination);
    targetHash = encode(
      new Uint8Array(
        await crypto.subtle.digest("sha-1", encoder.encode(targetFile)),
      ),
    ).toString();
  } catch (e) {
    console.log("Target file doesn't yet exists....");
  }

  if (targetHash != sourceHash) {
    await Deno.writeTextFile(destination, content);
  }
}
