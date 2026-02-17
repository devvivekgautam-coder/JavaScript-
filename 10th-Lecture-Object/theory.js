// Achha Vivek 👍
// Chalo ab **JavaScript Object ki theory** simple aur clear tarike se samajhte hain — bina jyada code ke.

// ---

// # 📘 JavaScript Object – Theory

// ## 🔹 1. Object kya hota hai?

// JavaScript me **Object ek non-primitive data type** hai jo multiple values ko ek single variable me store karta hai.

// Object data ko **key-value pair** me store karta hai.

// 👉 Structure:

// ```
// key : value
// ```

// Har key ko **property** bolte hain.
// Agar value function ho to use **method** bolte hain.

// ---

// ## 🔹 2. Object kyun use karte hain?

// Object ka use tab karte hain jab:

// * Hume real-world entity ko represent karna ho
//   (jaise student, car, user, product)
// * Multiple related data ko ek jagah store karna ho
// * Structured data manage karna ho

// Example (theory me samjho):
// Ek student ke paas name, age, roll number, marks — ye sab ek hi entity ke part hain.
// Isliye unhe object me store karte hain.

// ---

// ## 🔹 3. Object ki khas baatein (Characteristics)

// ### ✅ 1. Dynamic hota hai

// Object me baad me bhi property add ya remove kar sakte hain.

// ### ✅ 2. Reference Type hota hai

// Object memory me reference ke through store hota hai.
// Iska matlab:

// * Agar ek object ko dusre variable me assign karte ho
// * To dono same memory location ko point karte hain

// ### ✅ 3. Mutable hota hai

// Object ki properties change ho sakti hain.

// ---

// ## 🔹 4. Object ka Structure

// Object `{ }` curly braces me likha jata hai.

// Har property comma se separate hoti hai.

// ```
// {
//   property1: value1,
//   property2: value2
// }
// ```

// ---

// ## 🔹 5. Object ke Components

// ### 🔸 Property

// Object ka data (key + value)

// ### 🔸 Method

// Object ke andar function

// ### 🔸 this Keyword

// Object ke andar `this` ka matlab hota hai — current object.

// ---

// ## 🔹 6. Object vs Primitive

// | Primitive                    | Object                          |
// | ---------------------------- | ------------------------------- |
// | Simple value store karta hai | Multiple values store karta hai |
// | Immutable hota hai           | Mutable hota hai                |
// | Value copy hoti hai          | Reference copy hoti hai         |

// Primitive example: number, string, boolean
// Object example: array, function, object literal

// ---

// ## 🔹 7. Object ke Types (Important Theory)

// ### 1️⃣ Object Literal

// Direct `{}` se banaya gaya object

// ### 2️⃣ Constructor Function

// Function se multiple objects create karna

// ### 3️⃣ Class (ES6)

// Modern OOP style me object banana

// ---

// ## 🔹 8. JavaScript me sab kuch object hai? 🤔

// Almost sab kuch object jaisa behave karta hai:

// * Array → Object ka special type
// * Function → Object
// * Date → Object

// Bas primitive types (number, string, boolean, null, undefined, bigint, symbol) alag hote hain.

// ---

// # 🎯 Short Conceptual Summary

// * Object = structured data container
// * Key-value pair system
// * Real-world modeling ke liye use hota hai
// * Dynamic, mutable, reference type hota hai
// * JavaScript ka core concept hai

// 📌 Difference Between function and arrow function (with this)

// | Normal Function                  | Arrow Function                  |
// | -------------------------------- | ------------------------------- |
// | Apna `this` hota hai             | Apna `this` nahi hota           |
// | `this` call par depend karta hai | `this` parent scope se leta hai |
// | Method ke liye best              | Callback ke liye best           |
// | Constructor ban sakta hai        | Constructor nahi ban sakta      |
