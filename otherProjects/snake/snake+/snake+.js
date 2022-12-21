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