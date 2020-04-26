# `errou`

Error handling without `try`/`catch` blocks.

<!-- [![Build Status]()]() -->

[![NPM](https://img.shields.io/npm/v/errou.svg?logo=npm)](https://npmjs.org/package/errou)
![Uses TypeScript](https://img.shields.io/badge/Uses-Typescript-294E80.svg)

## Installing

```shell
yarn add errou

# If you're using NPM:
# npm install errou
```

## Why?

Have you ever written some code like:

```ts
import fs from "fs";

let contents;
try {
  contents = readFile("foo.txt", "utf8");
} catch (error) {
  // Deal with `error` here.
}

console.log(`Contents: ${contents}`);
```

With `errou`, you won't need to write any of this messy code anymore.

## Usage

`errou` abstracts `try`/`catch` blocks, so you don't have to deal with them anymore, which might make your code more readable.

```ts
import fs from "fs";
import errou from "errou";

const call = errou(fs.readFile, "foo.txt", "utf8");

if (call.ok) {
  console.log(`Contents: ${call.data}`);
}

if (!call.ok) {
  // Deal with `call.error` here.
}
```

It is also type-safe, as TypeScript will infer the returned value of the function that you put in the first argument.

## Authors and License

[lffg](https://github.com/lffg) and [contributors](https://github.com/lffg/errou/graphs/contributors).

MIT License, see the included [MIT](https://github.com/lffg/errou/blob/master/LICENSE) file.
