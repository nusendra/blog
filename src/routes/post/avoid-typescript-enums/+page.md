---
title: "Why You Should Avoid TypeScript Enums"
date: 2024-08-16 10:20:00
description: "A Bunch of Problems with TypeScript Enums"
tags: ['typescript']
draft: false
slug: avoid-typescript-enums
---

We all know TypeScript is great for solving typing issues in JavaScript, especially when you want to prevent bugs by restricting what values a variable can hold. For example, say we only want the `role` variable to be either `admin`, `user`, or `employee`. If you try to assign any other string, it should throw an error. Here’s what that might look like:

```typescript
let role = "admin"; // expected to be okay
role = "employee" // expected to be okay
role = "teacher" // expected to be error
```

So far, so good. To handle this, you could use a union string type like this:

```typescript
type Roles = 'admin' | 'employee' | 'user';

let role: Roles = 'admin'; // okay
role = 'teacher'; // error
```

But if you go with that union type, you'll lose out on code editor autocompletion. You end up needing to know the exact options without any hints. Then, let's have a look at what the Enums is!

```typescript
enum ROLES {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    USER = "user"
}

let role: ROLES = ROLES.ADMIN // okay
role = ROLES.EMPLOYEE // okay

```

With Enums, you get the autocomplete magic and can prevent any unintended strings from being assigned. But here’s where things get weird with TypeScript’s Enums:

```typescript
let role: ROLES = ROLES.ADMIN // okay
role = "admin" // Type '"admin"' is not assignable to type 'ROLES'.
```
What the heck? How does assigning "**admin**" to role throw an error? Isn’t that the same value as **ROLES.ADMIN**? It gets even wilder with numeric Enums:

```typescript
enum NUMBER {
    ONE = 1,
    TWO = 2
}

let number: Number = NUMBER.ONE; // okay
number = 1; // okay

```

Super confusing, right? And if you have two Enums with the same values, you can’t assign one Enum to the other—even if the values match exactly:

```typescript
enum ANOTHER_ROLES {
    ADMIN = "admin",
    EMPLOYEE = "employee",
    USER = "user"
}

let role: ROLES = ROLES.ADMIN // okay
role = ANOTHER_ROLES.ADMIN // Type 'ANOTHER_ROLES.ADMIN' is not assignable to type 'ROLES'.

```

On top of that, if you peek at the transpiled code (from TS to JS), you'll notice it bloats your bundle size. Here’s what happens when TypeScript compiles Enums to JavaScript:

```javascript
"use strict";
var ROLES;
(function (ROLES) {
    ROLES["ADMIN"] = "admin";
    ROLES["EMPLOYEE"] = "employee";
    ROLES["USER"] = "user";
})(ROLES || (ROLES = {}));
let role = ROLES.ADMIN; // okay
role = ROLES.EMPLOYEE; // okay
```
Most developers avoid using Enums for type and value declarations. They often prefer using `const ... as const` thing, which I'll break down in another post. Hope you enjoyed this one, and as always, I appreciate any feedback. Catch you later!
