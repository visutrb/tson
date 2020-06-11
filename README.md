# @vsb/tson

>@vsb/tson is a library that makes JSON to TypeScript object conversion simpler. This library is heavily inspired by gson.

[![Build Status](https://travis-ci.org/visutrb/tson.svg?branch=master)](https://travis-ci.org/visutrb/tson) [![codecov](https://codecov.io/gh/visutrb/tson/branch/master/graph/badge.svg)](https://codecov.io/gh/visutrb/tson)

## Install

1. Install the package:
```bash
npm install --save @vsb/tson
```

2. Install `reflect-metadata`:
```bash
npm install --save reflect-metadata
```

3. Import `reflect-metadata` in the entry file of your project (`index.ts`, for example):
```typescript
import "reflect-metadata";
```

**TypeScript configuration**

These options must be enabled in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

**Requirements**

* NodeJS >= 8.0.0 (tested on 8.x.x and 12.x.x)
* TypeScript >= 3.4.2
* reflect-metadata >= 0.1.0

## Usage



**Example**

Defining TypeScript class:
```typescript
import { Serializable, SerializedProperty } from "@vsb/tson";

@Serializable()
class Article {

  @SerializedProperty()
  id: number;

  @SerializedProperty()
  title: string;

  @SerializedProperty()
  content: string;

  @SerializedProperty()
  author: User;
}

@Serilizable()
class User {

  @SerializedProperty()
  id: number;

  @SerializedProperty("first_name")
  firstName: string;

  @SerializedProperty("last_name")
  lastName: string;

  // The options can be omitted for 
  // primitive data types (number, string, etc.)
  @SerializedProperty({ itemType: Article })
  articles: Article[];
}
```

Then create an instance of `Tson` to use the library:
```typescript
import { Tson } from "@vsb/tson";

const tson = new Tson();
const article = tson.fromJson(json, Article); // Article {}

const jsonUser = tson.toJson(user); // Object {}
```

To convert array of objects, use `Array.map` function:
```typescript
const articles = jsonArray.map(item => tson.fromJson(item, Article));
```


## License

[MIT](https://mit-license.org)
