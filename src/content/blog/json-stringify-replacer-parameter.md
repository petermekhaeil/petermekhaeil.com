---
title: How to keep undefined values in JSON.stringify
pubDate: 2022-08-22
description: Learn how to use the replacer parameter of JSON.stringify to replace undefined values.
tags:
  - javascript
devto: https://dev.to/petermekhaeil/how-to-keep-undefined-values-in-jsonstringify-3kip
eleventyNavigation:
  parent: Writing
---

The [JSON spec](https://www.json.org/json-en.html) does not allow `undefined` values, so when you try to stringify an object that contains an undefined value, the key will get removed:

```js
const person = { name: 'Peter', age: undefined };

JSON.stringify(person);
// '{"name":"Peter"}'
```

There are workarounds to keep `undefined` in the return value, but because it is not part of spec, you will not be able to parse the string back to a JSON. Instead, we can replace it with `null` which is valid.

JSON.stringify has an optional second parameter [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter) that can recursively transform properties during the stringify process.

Using the `replacer` parameter of JSON.stringify, we can replace `undefined` values with a value that is accepted - such as `null`:

```js
const person = { name: 'Peter', age: undefined };

function replacer(key, value) {
  return value === undefined ? null : value;
}

JSON.stringify(person, replacer);
// '{"name":"Peter","age":null}'
```

An example use case where this can come useful is network request payloads in the case we need to let the server know which values are not defined. POST requests have a string body, if we need to send over an object, we require to `JSON.stringify` the request. The above approach will help us send over values that are not defined (provided that the server understands `null` as an acceptable value).
