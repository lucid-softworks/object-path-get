# `@lucid-softworks/object-path-get`

Read own properties through a string path or a property-key segment array.
Prototype properties are never traversed. A fallback is returned only when the
path is missing, not when the stored value is `undefined`.

```ts
import { getPath } from "@lucid-softworks/object-path-get";

const config = { server: { port: 8080 } };
getPath(config, "server.port", 3000);
```
