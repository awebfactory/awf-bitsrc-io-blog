// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/joke.ts";
import * as $2 from "./routes/api/search.ts";
import * as $3 from "./routes/blog/first.tsx";
import * as $4 from "./routes/blog/my-first-blog-post.tsx";
import * as $5 from "./routes/blog/second-one.tsx";
import * as $6 from "./routes/blog/third.tsx";
import * as $7 from "./routes/index.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/SearchBar.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/joke.ts": $1,
    "./routes/api/search.ts": $2,
    "./routes/blog/first.tsx": $3,
    "./routes/blog/my-first-blog-post.tsx": $4,
    "./routes/blog/second-one.tsx": $5,
    "./routes/blog/third.tsx": $6,
    "./routes/index.tsx": $7,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/SearchBar.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
