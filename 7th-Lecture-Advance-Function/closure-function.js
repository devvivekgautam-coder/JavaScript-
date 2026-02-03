// Closure Function

// When a function “remembers” variables from its lexical scope, even after the outer function 
// has finished execution.

function name() {
    let yourName = 'Vivek Gautam';

    return function returnName() {
        console.log(yourName);
    }
}

let myName = name();
myName();