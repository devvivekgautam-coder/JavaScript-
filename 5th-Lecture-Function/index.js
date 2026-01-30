// hoisting
// Hoisting me ham var ya function keyword ke naam se banaya huaa ho
// to interpreter use detect kar sabse top me automatic define ho jata hai 

function sum(a, b) {
    console.log(a + b);
}

sum("Rohit", "Sharma");

function cube(n) {
    return n**3;
}

console.log(cube(2));