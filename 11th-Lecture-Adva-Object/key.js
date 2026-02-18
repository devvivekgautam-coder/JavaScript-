let user = {
  name: "Vivek",
  age: 22
};

console.log(Object.keys(user));

// 📌 Definition

// Object.keys() is a built-in JavaScript method that returns an array of an object’s own property names (keys).

// 👉 It does not return values.
// 👉 It does not return methods from the prototype.
// 👉 It returns only enumerable own properties.

// 🧠 Syntax
// Object.keys(objectName)

// Takes an object as an argument

// Returns an array of strings (keys)