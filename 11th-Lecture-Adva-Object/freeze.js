const user = { name: "Vivek" };

Object.freeze(user);

user.name = "Rahul"; // ❌ won't change
console.log(user.name);

// 📌 Definition

// Object.freeze() is a built-in JavaScript method that makes an object completely immutable (unchangeable).

// After freezing an object:

// ❌ You cannot add new properties

// ❌ You cannot delete properties

// ❌ You cannot modify existing values

// The object becomes read-only.

// 🧠 Syntax
// Object.freeze(objectName)

// Takes an object as argument

// Returns the same object (now frozen)