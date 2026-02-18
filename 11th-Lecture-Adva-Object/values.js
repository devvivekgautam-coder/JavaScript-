let obj = {
  name: "Vivek",
  age: 22
};

console.log(Object.values(obj));
// ["Vivek", 22]

// 📌 Definition

// Object.values() is a built-in JavaScript method that returns an array of an object’s own enumerable property values.

// 👉 It gives you only the values
// 👉 It does NOT return keys
// 👉 It does NOT return inherited properties

// 🧠 Syntax
// Object.values(objectName)

// Takes an object as an argument

// Returns an array