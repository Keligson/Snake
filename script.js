//-----------GRABBING ELEMENTS------------------

const canvas = document.querySelector('canvas')
// Gets canvas element from HTML file
const ctx = canvas.getContext('2d')
// getContext(‘2d’) gives access to built-in methods to draw and do things on the canvas

//----------------------------------------------



//-----------PLAYABLE AREA------------------

const box = 40 // 40px
// 16 x 16 grid
ctx.height = 16 * box // 16px x box (40px) = 640px x 640px 
ctx.width = 16 * box

//----------------------------------------------



//-----------GAME LOGIC------------------

// The snake will be an array, filled with objects that have an X and Y position of each box of the snake

// Then when it moves:
// 1. Add a new object to the front of the array with the new X and Y position
// 2. Remove the object from the end



let snake = []
// 'snake' is the array that holds each box of the snake

snake[0] = {
    x: 2 * box,
    y: 7 * box
}
// Then we give it it's first value (the snake's head)

let direction
// 'direction' is a variable with nothing assigned to it, used to move the snake

let food =  {
    x: 10 * box,
    y: 7 * box
}
// 'food' is an object to hold the coordinates of the food for the snake to eat

let score = 0
// 'score' tracks how many pieces of food the snake eats
//----------------------------------------------



//------------------CONTROLS-----------------

document.addEventListener('keydown', (event) => {
    let key = event.key
    // 'key' stores the code of the key that was pressed
    if(key === 37 && direction != "right"){
        direction = "left"
    } else if(key == 38 && direction != "down"){
        direction = "up"
    } else if(key == 39 && direction != "left"){
        direction = "right"
    } else if(key == 40 && direction != "up"){
        direction = "down"
        // this last else if makes sure the snake can't go back on itself
    }
    // the value of key is then checked to see if it's an arrow key
    // then a direction is assigned to direction based on the key pressed
    console.log(key)
})
// EventListener waits for a key press, then runs a function

//----------------------------------------------



//------------------DRAWING TO THE CANVAS-----------------
// 'canvas' can only draw:
// Rectangles
// Lines
// Arcs/Circles
// Bezier Curves
// Images
// Text

// DRAWING A RECTANGLE
// You must start with the variable which is equal to the canvas.getContext('2d') as fillRect as a method from getContext function

ctx.fillStyle = "red"
ctx.fillRect(80, 40, 60, 100)
//----------------------------------------------




//------------------GAME LOGIC-----------------

// This function detects if the snake hits it's own body
function collision(head,array) {
                // Takes in the head of the snake and the snake array (body)

    // Loops through the length of the snake array (body)
    for (let i = 0; i < array.length; i++) {
        // Checks if the snake's head and body X's and Y's are in the same location
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
            // Returns true if the snake's head and body are intersecting, game over!
        }
    }
    return false
    // Returns false if the snake's head and body are not intersecting
}


// This function will hold the game logic
function game() {

            // Setting the interval so that game() runs every 0.1 second
    let draw = setInterval(function() {


        // The clearRect method will clear all first, then re-draw the snake
        ctx.clearRect(0, 0, ctx.width, ctx.height)

        // Scoring system
        ctx.font = "20px  Arial"
        ctx.fillText(`Score: ${score}`, 10, 30)
                                //Text      X   Y

        // This loops through the snake array (the body) and draws a square using each object's X and Y value
        for(let i = 0; i < snake.length ; i++) {
            

                            // Drawing the snake
        // Color of the snake
        ctx.fillStyle = "green"

        // Telling canvas where to put the snake
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        // "box, box" determines the height and width of each snake box on the grid
        }

                        // Drawing the food
        // Telling canvas where to put the food
        ctx.fillStyle = "red"
        ctx.fillRect(food.x, food.y, box, box)
        // "box, box" determines the height and width of each food box on the grid


                        // Snake movement
        // Sets snakeX/Y to the X/Y value of the first value in the snake array
        let snakeX = snake[0].x
        let snakeY = snake[0].y

        // Finds the direction that the snake is going in, adds one box in that direction to the snake X or Y
        if(direction == "left")  snakeX -= box
        if(direction == "up")  snakeY -= box
        if(direction == "right")  snakeX -= box
        if(direction == "down")  snakeY -= box

        // if the snake's head X AND Y are equal to the food's X AND Y, then the score will increase by 1
        if(snakeX == food.x && snakeY == food.y) {
            // food function will spawn new food box at random X and Y values once it's been eaten
            food = {
                x: Math.floor(Math.random()*15+1) * box,
                y: Math.floor(Math.random()*15+1) * box
            }
            score +1
        }
        else {
            // .pop removes the end of the array to simulate it leaving the last box in the array
            // this can do in here so that it removes the tail box every time EXCEPT for when it hits a food box
            snake.pop()
        }

        // Defines the snake's head to push to the array
        let newHead = {
            x : snakeX,
            y : snakeY
        }

        // .unshift adds the snake's new head box to the start of the array, sumulating it moving to the new box in the array
        snake.unshift(newHead)


        // This makes sure the new snake head is bigger than 0 and less than 16 boxes across or down
        // collision is also called with the newHead var and the entire snake array (head and body)
        if (snakeX < 0 || snakeX >15 * box || snakeY < 0 || snakeY > 15 * box || collision(newHead, snake)) {
            clearInterval(draw)
            // If any of those values are true this will stop the game
        }

    }, 100) // 0.1 seconds
}


// Calling the game() function to start the game
game()

//----------------------------------------------
