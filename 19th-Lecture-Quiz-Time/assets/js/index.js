let startBtn = document.getElementById("startBtn");
let countdown = document.getElementById("countdown");
let usernameInput = document.getElementById("username");

let count = 3;

startBtn.addEventListener("click", () => {

    let username = usernameInput.value;

    if (username === "") {
        alert("Enter Your Name Here.....");
        return;
    }

    document.querySelector(".quizBox").style.display = "none";
    document.querySelector(".countdown").style.display = "block";

    let timer = setInterval(() => {
        countdown.innerText = count;
        count--;

        if (count < 0) {
            clearInterval(timer);
        }

    }, 1000); 

});