// Checking Negative, Positive Or Zero

// let num = 0;

// if (num >= 1) {
//     console.log(`${num} : Is A Positive Number.`);
// }
// else if (num <= -1) {
//     console.log(`${num} : Is A Negative Number.`);
// }
// else {
//     console.log(`${num} : Is Zero.`);
// }


// Checking UserName And PassWord

// let userName = 'admin', pass = 1234;

// let userPrompt = prompt("Enter Your User Name : ");
// let userPass = Number(prompt("Enter Your Password :"));

// if (userName === userPrompt && pass === userPass) {
//     document.getElementById("status").innerHTML = 'Login successful';
// }
// else {
//     document.getElementById("status").innerHTML = 'Invalid credentials';
// }


// Even Number Between 1 To 20

// for (let i = 1; i <= 20; i++) {
//     if (i % 2 == 0) {
//         console.log(i);
//     }
// }

// function that returns the square of a number

// function squre(num) {
//     return num **2;
// }
// console.log(squre(4));


// function that checks if a number is prime

// function isPrime(n) {
//     if (n % 1 && n % n == 0) {
//         console.log(`Is A Prime Number`);
//     }
//     else {
//         console.log(`Is Not A Prime Number`);
//     }

//     return n;
// }
// console.log(isPrime(2));
// console.log(isPrime(8));
// console.log(isPrime(13));

// let arr = [1, 2, 3, 4, 5, 6];

// let evenNum = arr.filter((val) => {
//     return val % 2 == 0;
// });

// let evenNum = arr.filter((val) => {
//     return val % 2 == 0
// });

// let multiEven = evenNum.map((num) => {
//     return num * 2;
// })

// console.log(multiEven);

function multiarr(arr  = []) {
    let evenArr =  arr.filter((n) => {
        return n % 2 === 0;
    });

    let multiplay =  evenArr.map((s) => {
        return s * 2;
    });

    return multiplay;
}
console.log(multiarr(10, 12, 13, 14, 15, 16));