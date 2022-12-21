function setFood() {
    //places food
    while (true) {

        var x = Math.floor(Math.random() * 2) == 0 ? MAX_X-1 : 0;
        var y = Math.floor(Math.random() * 2) == 0 ? MAX_Y-1 : 0;


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

function growSnake() {
    //grows the snake
    var l = snake.cells.length
    for(var i = 0; i < l-1; i++) {
        var head = snake.cells[0];
        var newCell = {x: head.x, y: head.y};
        snake.cells.push(newCell);
    }
    
}

function displayScore() {
    //displays the score
    var score = snake.cells.length - 1;
    document.getElementById("score").innerHTML = "Score:" + score;
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

    setTimeout(gameLoop, 25);
}


document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37 || event.keyCode == 65) {
        if (snake.direction == "up") {
            return;
        }
        snake.direction = "down";
    }
    else if (event.keyCode == 38 || event.keyCode == 87) {
        if (snake.direction == "right") {
            return;
        }
        snake.direction = "left";
    }
    else if (event.keyCode == 39 || event.keyCode == 68) {
        if (snake.direction == "down") {
            return;
        }
        snake.direction = "up";
    }
    else if (event.keyCode == 40 || event.keyCode == 83) {
        if (snake.direction == "left") {
            return;
        }
        snake.direction = "right";
    }

    if(!gameStarted) {
        gameLoop();
        gameStarted = true;
    }
});

