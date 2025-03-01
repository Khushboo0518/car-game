// script.js
let car = document.getElementById("car");
let gameContainer = document.querySelector(".game-container");
let gameWidth = gameContainer.clientWidth;
let carLeft = 175;
let obstacles = [];
let gameOver = false;
let score = 0;
let scoreDisplay = document.getElementById("score");

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && carLeft > 0) {
        carLeft -= 25;
    } else if (event.key === "ArrowRight" && carLeft < gameWidth - 50) {
        carLeft += 25;
    }
    car.style.left = carLeft + "px";
});

function createObstacle() {
    if (gameOver) return;
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = Math.floor(Math.random() * (gameWidth - 50)) + "px";
    obstacle.style.top = "-100px";
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    if (gameOver) return;
    obstacles.forEach((obstacle, index) => {
        let obstacleTop = parseInt(obstacle.style.top);
        if (obstacleTop > 600) {
            obstacles.splice(index, 1);
            obstacle.remove();
            score++;
            scoreDisplay.textContent = "Score: " + score;
        } else {
            obstacle.style.top = obstacleTop + 5 + "px";
        }
        checkCollision(obstacle);
    });
    setTimeout(moveObstacles, 30);
}

function checkCollision(obstacle) {
    let carRect = car.getBoundingClientRect();
    let obsRect = obstacle.getBoundingClientRect();
    if (
        carRect.left < obsRect.left + obsRect.width &&
        carRect.left + carRect.width > obsRect.left &&
        carRect.top < obsRect.top + obsRect.height &&
        carRect.height + carRect.top > obsRect.top
    ) {
        alert("Game Over! Score: " + score);
        gameOver = true;
        location.reload();
    }
}

setInterval(createObstacle, 2000);
moveObstacles();