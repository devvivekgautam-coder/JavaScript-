const obj1 = { a: 1 };
const obj2 = { b: 2 };

const result = Object.assign({}, obj1, obj2);
console.log(result);

// 📌 Definition

// Object.assign() is a built-in JavaScript method used to copy properties from one or more source objects into a target object.

// 👉 It is mainly used for:

// Copying objects

// Merging objects

// Creating shallow clones

// 🧠 Syntax
// Object.assign(target, source1, source2, ...)

// target → The object that will receive properties

// source → The object(s) from which properties are copied

// Returns the target object