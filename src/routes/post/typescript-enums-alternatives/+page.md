---
title: "TypeScript Enums Alternatives"
date: 2024-08-18 19:20:00
description: "Better Ways to Avoid TypeScript Enums"
tags: ['typescript']
draft: false
slug: typescript-enums-alternatives
---

![typescript image](https://andrejgajdos.com/wp-content/uploads/2023/08/typescript.webp)

Before diving into this post, I recommend checking out my previous article on [Avoid TypeScript Enums](https://nusendra.com/post/avoid-typescript-enums) where I explain why TS enums are a bit of a hassle. Now, let’s talk about some better alternatives to TypeScript enums. Here are three options that you can use instead.

### Type-Safe Object Constants

Let’s jump straight into the code and see if this approach works better:

```typescript
// typescript
const roles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

type TypeRoles = typeof roles;
type ROLES = TypeRoles[keyof TypeRoles];

const role: ROLES = roles.ADMIN; // works
const role2: ROLES = 'admin'; // also works
```

If you look at `role2`, you’ll notice we can assign a string to the `ROLES` type even if it’s not from the roles object. Compared to TypeScript enums, you’d get an error if you tried that. Let’s check out the compiled version:

```javascript
// javascript
"use strict";
const roles = {
    ADMIN: 'admin',
    USER: 'user',
};
const role = roles.ADMIN;
const role2 = 'admin';
```

This code is cleaner and more maintainable than TypeScript enums.

### Const Enums

Now, let’s look at the second option: using TypeScript’s enums with the `const` keyword.

```typescript
// typescript
const enum ROLES {
    ADMIN = 'admin',
    USER = 'user'
}

const role: ROLES = ROLES.ADMIN; // works
const role2: ROLES = 'admin'; // error
```

In this approach, you’ll get an error if you try assigning a string directly to `role2` because it’s tied to the `ROLES` enum.

And here is the compiled version

```javascript
// javascript
"use strict";
const role = "admin" /* ROLES.ADMIN */;
```

This method produces a smaller compiled output since the enum doesn’t get compiled to JavaScript. However, you still get the context that "admin" was generated from ROLES.ADMIN.

### Union String

Finally, here’s the simplest option:

```typescript
// typescript
type ROLES = 'admin' | 'user';

const role: ROLES = 'admin'; // okay
const role: ROLES = 'employee'; // error
```

It’s pretty straightforward, but you won’t get code completion from your editor. You’ll need to know the options under the ROLES type and type them manually.

And the compiled JavaScript:

```javascript
// javascript
"use strict";
const role = 'admin';
```

Super simple. Not much more to say here.

### Comparison

Here’s a quick comparison of the four approaches:

|  |Typescript's Enums | Type-Safe Object Constants | Const Enums | Union String |
|---|---|---|---|---|
| Simplicity of Code | Simple | Complex | Simple | Super Simple  |
| Generated Code | Complex  | Simple  | Super Simple  | Super Simple  |
| Quality  | Adequate  | Best  | Good  | Adequate  |

### Final Thoughts
Personally, I prefer const enums. They offer code completion, a smaller compiled output, and the clarity of enums. The only downside is that the maintainability of the JS version isn’t as good as with type-safe object constants. But honestly, who the f*** want to maintaining a codebase from the JS output anyway?


