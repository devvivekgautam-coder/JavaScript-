let name = prompt("Enter Employee Name : ");
document.getElementById("name").innerText = `Name : ${name}`;

let salary = Number(prompt("Enter Your Salary : "));
document.getElementById("salary").innerText = `Salary : ${salary}`

let HRA = Number(prompt("Enter HRA (%) : "));
document.getElementById("HRA").innerText = `HRA : ${HRA} %`;

let DA = Number(prompt("Enter DA (%) : "));
document.getElementById("DA").innerText = `DA : ${DA} %`;

let TA = Number(prompt("Enter TA (%) : "));
document.getElementById("TA").innerText = `TA : ${TA} %`;

let GS = salary + (((HRA * salary / 100) + (DA * salary / 100) + (TA * salary / 100)) * salary) / 100;
document.getElementById("GS").innerText = `GS : ${GS}`;