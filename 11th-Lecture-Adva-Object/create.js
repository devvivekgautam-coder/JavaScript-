const person = {
  greet() {
    console.log("Hello");
  }
};

const user = Object.create(person);
user.greet(); // Hello

// 📌 Definition

// Object.create() is a built-in JavaScript method used to create a new object with a specified prototype.

// 👉 It is mainly used for:

// Prototypal inheritance

// Creating objects without using class

// Controlling prototype chain

// 🧠 Syntax
// Object.create(prototype, propertiesObject)

// Parameters:

// 1️⃣ prototype → The object which should become the new object's prototype
// 2️⃣ propertiesObject (optional) → Used to define properties with descriptors