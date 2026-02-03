// A Outer Function Has Another Inner Function

function maths(a, b, operator) {

    function sum(a, b) {
        console.log(a + b);
    }

    function sub(c, d) {
        console.log(c - d);
    }

    function multi(e, f) {
        console.log(e * f);
    }

    function div(g, h) {
        console.log(g / h);
    }

    function modu(i, j) {
        console.log(i % j);
    }

    switch (operator) {
        case "+" : {
            sum(a, b);
            break;
        }

        case "-" : {
            sub(a, b)
            break;
        }

        case "*" : {
            multi(a, b);
            break;
        }

        case "/" : {
            div(a, b)
            break;
        }

        case "%" : {
            modu(a, b);
            break;
        }
    }
}

maths(10, 20, "+");
maths(20, 10, "-");
maths(10, 20, "*");
maths(100, 20, "/");
maths(50, 10, "%");