# `errou`

Error handling without `try`/`catch` blocks.

[![Actions Status](https://github.com/lffg/errou/workflows/CI/badge.svg)](https://github.com/lffg/errou/actions)
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
import fs from 'fs';

let contents;
try {
  contents = readFileSync('foo.txt', 'utf8');
} catch (error) {
  // Deal with `error` here.
}

console.log(`Contents: ${contents}`);
```

With `errou`, no more. It abstracts those ugly use cases of `try`/`catch` blocks for you. It supports both synchronous and asynchronous functions – in this last case, the function _must_ return a Promise, which will be resolved by `errou`.

## Usage

```ts
import fs from 'fs';
import errou from 'errou';

const call = errou(() => fs.readFileSync('foo.txt', 'utf8'));

if (call.ok) {
  console.log(`Contents: ${call.data}`);
}

if (!call.ok) {
  // Deal with `call.error` here.
}
```

In the previous example, we passed an arrow function, which will be invoked by `errou`. You can also pass a function reference:

```ts
function someFunction(a: string, b: number) {
  if (b % 2 !== 0) {
    throw new Error('Only even numbers are allowed.');
  }
  return { a, b };
}

const call = errou(someFunction, 'Foo', 10);

// call.ok
// call.data
// call.error
```

TypeScript will complain if `errou` last arguments does not match with the first function's argument types.

If the function has some [overloads](https://www.typescriptlang.org/docs/handbook/functions.html#overloads), you must pass a lambda as done in the `fs.readFile` example.

### The `error` type

By default, `call.error` has the [`unknown`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type) type. You may [assert](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) that type to your desired `Error` instance.

<details>
<summary>Asserting the <code>error</code> type</summary>

```ts
const call = errou(someFn, ...args);

if (!call.ok) {
  console.log((call.error as Error).message);
}
```

</details>

## Authors and License

[lffg](https://github.com/lffg) and [contributors](https://github.com/lffg/errou/graphs/contributors).

MIT License, see the included [MIT](https://github.com/lffg/errou/blob/master/LICENSE) file.
