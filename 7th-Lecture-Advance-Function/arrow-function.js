// 1. Arrow Functions Can Be An Anonymous Function
// 2. Use Const Keyword Not Function
// 3. Shorter Than Normal Function
// 4. We Can Remove Return Keyword If We Have Only One Line Code
//    And Also Remove () If We Have Only One Parameter


const fun = (a, b) => {
    return a + b;
}

console.log(fun(10, 20));

// OR

const tan = n => n ** 3;
console.log(tan(3));