const user = { name: "Vivek" };

Object.seal(user);

user.name = "Rahul"; // ✅ allowed
user.age = 22;       // ❌ not allowed

// 📌 Definition

// Object.seal() is a built-in JavaScript method that locks an object’s structure, but still allows modification of existing property values.

// After sealing an object:

// ❌ You cannot add new properties

// ❌ You cannot delete properties

// ✅ You CAN modify existing values

// So it partially protects the object.

// 🧠 Syntax
// Object.seal(objectName)

// Takes an object as argument

// Returns the same object (now sealed)