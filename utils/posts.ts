import { extract } from "$std/encoding/front_matter.ts";

export interface Post {
  id: string;
  title: string;
  snippet: string;
  description: string;
  content: string;
}

export async function loadPost(id: string): Promise<Post | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`./content/${id}.md`);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null;
    }
    throw err;
  }
  const { attrs, body } = extract(text);
  const params = attrs as Record<string, string>;
  return {
    id,
    title: params.title,
    snippet: params.snippet,
    description: params.description,
    content: body,
  };
}

export async function listPosts(): Promise<Post[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./content")) {
    const id = entry.name.replace(".md", "");
    promises.push(loadPost(id));
  }
  const posts = await Promise.all(promises) as Post[];
  return posts;
}
