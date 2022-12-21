var snake = {
    cells: [
        {x: 10, y: 10}, //head
        {x: 9, y: 10},
    ],
    direction: "right"
};

var food = {
    x: 5,
    y: 5
};

var MAX_X = null;
var MAX_Y = null;

var ctx = null;

var gameStarted = false;


function drawPixel(x, y, color) {
    //draws a pixel of size 10x10
    ctx.fillStyle = color;
    ctx.fillRect(x*10, y*10, 10, 10);
}

function clearCanvas() {
    //clears the canvas
    ctx.clearRect(0, 0, 500, 500);
}

function drawSnake() {
    //draws the snake
    for (var i = 0; i < snake.cells.length; i++) {
        var cell = snake.cells[i];
        drawPixel(cell.x, cell.y, "blue", ctx);
    }
}

function growSnake() {
    //grows the snake
    var head = snake.cells[0];
    var newCell = {x: head.x, y: head.y};
    snake.cells.push(newCell);
}

function moveSnake() {
    //moves the snake
    var head = snake.cells[0];
    var newCell = {x: head.x, y: head.y};
    if (snake.direction == "right") {
        newCell.x++;
    }
    else if (snake.direction == "left") {
        newCell.x--;
    }
    else if (snake.direction == "up") {
        newCell.y--;
    }
    else if (snake.direction == "down") {
        newCell.y++;
    }
    snake.cells.unshift(newCell);
    snake.cells.pop();
}

function setFood() {
    //places food
    while (true) {

        var x = Math.floor(Math.random() * MAX_X);
        var y = Math.floor(Math.random() * MAX_Y);

        //check if food is on snake
        var onSnake = false;
        for (var i = 0; i < snake.cells.length; i++) {
            var cell = snake.cells[i];
            if (cell.x == x && cell.y == y) {
                onSnake = true;
                break;
            }
        }

        if (onSnake) {
            continue;
        }

        food.x = x;
        food.y = y;
        return;
        
    }
}

function checkGameOver() {
    //checks if game is over
    var head = snake.cells[0];
    if (head.x < 0 || head.x >= MAX_X || head.y < 0 || head.y >= MAX_Y) {
        return true;
    }

    for (var i = 1; i < snake.cells.length; i++) {
        var cell = snake.cells[i];
        if (cell.x == head.x && cell.y == head.y) {
            return true;
        }
    }

    return false;
}

function drawFood() {
    //draws food
    drawPixel(food.x, food.y, "red", ctx);
}

function drawGame() {
    //draws the game
    clearCanvas();
    drawSnake();
    drawFood();
}

function displayScore() {
    //displays the score
    var score = snake.cells.length - 2;
    document.getElementById("score").innerHTML = "Score: " + score;
}

function gameLoop() {
    //game loop
    moveSnake();

    if (checkGameOver()) {
        alert("Game Over! Reload to Play Again.");
        return;
    }

    //check if snake is eating food
    var head = snake.cells[0];
    if (head.x == food.x && head.y == food.y) {
        growSnake();
        setFood();
        displayScore();
    }

    drawGame();

    setTimeout(gameLoop, 70);
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (snake.direction == "right") {
            return;
        }
        snake.direction = "left";
    }
    else if (event.keyCode == 38 || event.keyCode == 87) {
        if (snake.direction == "down") {
            return;
        }
        snake.direction = "up";
    }
    else if (event.keyCode == 39 || event.keyCode == 68) {
        if (snake.direction == "left") {
            return;
        }
        snake.direction = "right";
    }
    else if (event.keyCode == 40 || event.keyCode == 83) {
        if (snake.direction == "up") {
            return;
        }
        snake.direction = "down";
    }

    if(!gameStarted) {
        gameLoop();
        gameStarted = true;
    }
});



window.onload = function() {

    ctx = document.getElementById("canvas").getContext("2d");

    MAX_X = Math.floor(ctx.canvas.width/10);
    MAX_Y = Math.floor(ctx.canvas.height/10);

    setFood();
    drawGame();
}
