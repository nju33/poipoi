# Poipoi

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

💉 To inject data into a class method.

## Install

```bash
yarn add poipoi
npm i -S poipoi
```

## Usage

```js
import Poipoi from 'poipoi';

const a = new Poipoi({foo: 'foo'});
a.set({
  bar: 'bar',
  baz: 'baz'
});

const b = new Poipoi({hoge: 'hoge'});

class Foo {
  // somethingMethod(b-obj, a-obj, ...args)
  @a.inject('foo', 'baz')
  @b.inject('hoge')
  somethingMethod({hoge}, {foo, baz}, ...args) {}
}
```

## API

### `constructor(initialValue = {})`

- `initialValue`: `Object`

### `set(value)`

- `value`: `Object`

Overwriting data.

### `get(name = null)`

- `name`: `String`

Get data by `name`. If it is `null`, return it all.

### `clear()`

Delete all data

### `inject(...names)`

- `name`: `String`

Inject data written in `names` to the class method.

## Lisence

The MIT License (MIT)

Copyright (c) 2017 nju33 <nju33.ki@gmail.com>
