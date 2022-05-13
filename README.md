# wp-fetch

Use typesafe fetch requests to a wp-json REST api.

You need to install `headless` plugin to use menus.

**ALPHA-Version:** function names and signatures may change.

## Usage

Install package with `npm i @palasthotel/wp-fetch --save`.

Have a look [index.ts](https://github.com/palasthotel/wp-fetch/blob/main/src/index.ts) for the list available functions. As it is a typescript project method signatures are typed and should be easy to use even in a javascript environmen (but better use typescript).

## Example

```typescript
import {wpFetchPosts} from '@palasthotel/wp-fetch';

// in a async function context
const response = await wpFetchPosts("https://mySite.com/",{
    type: "posts",
});

// without async function context
wpFetchPosts("https://mySite.com/",{
    type: "posts",
}).then (response => {
    
});

```