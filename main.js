// let variables from document,
let body = document.body
let gameArea = document.querySelector(".gameArea")
let message = document.querySelector(".message")
let btn = document.querySelector(".btn")
message.innerHTML = "<h3>Press Button to start the Game!</h3>"
message.style.margin = "1rem"

// global variables,
let colorMsg = elementType("div")
let gameColors = ["red", "blue", "green", "yellow"]
let gameClicks = []
let userClicks = []
let inPlay = false
let playNum = 1
let score = 0

// window needs to load all of them before the gameplay,
window.addEventListener("load", setGame)

function setGame() {
    //first we set the colors of the div with js,
    for (let i = 0; i < gameColors.length; i++) {
        let div = elementType("div")
        div.style.backgroundColor = gameColors[i]
        div.myColor = gameColors[i]
        div.classList.add("box")
        // this div is listen to when user clicks the one of four divs,
        div.addEventListener("click", (e) => {
            // If inplay true means user can click div otherwise it won't work,
            if (inPlay) {
                // we push the color of the div in userclicks array,
                colorMsg.innerHTML = `${div.myColor} got clicked!`
                colorMsg.style.marginTop = "1rem"
                body.insertBefore(colorMsg, message)
                userClicks.push(div.myColor)
                // when we clicks div it sets the class of active,
                e.target.classList.add("active")
                setTimeout(() => {
                    // and it removes as well with 500ms,
                    colorMsg.innerHTML = ""
                    e.target.classList.remove("active")
                }, 500)
                // This can set in last if userClicks and gameClicks have equal lengths, game could be end,
                if (userClicks.length == gameClicks.length) {
                    inPlay = false
                    endGame()
                }
            }
        })
        // I added four different classes to four divs to create design,
        div.classList.add(gameColors[i])
        gameArea.appendChild(div)
    }
}

// This function just for element creation for document,
function elementType(type) {
    return document.createElement(type)
}

// add click event to the button,
btn.addEventListener("click", () => {
    if (!inPlay) {
        player()
        btn.style.display = "none"
        message.innerHTML = ""
    }
})

// when the button clicks player() runs,
function player() {
    btn.disabled = true
    gameClicks = []
    userClicks = []
    // we feed playNum as the prop in this function,
    sequenceRun(playNum)
}

// This is the endGame for the game,
function endGame() {
    btn.disabled = false
    btn.style.display = "block"
    //We compare the Array strings by using toSrting() method,
    if (userClicks.toString() == gameClicks.toString()) {
        playNum++
        score++
        message.innerHTML = `<h3>You guess was correct!</h3><br/><h4>Your score ${score}`
    }
    else {
        playNum = 1
        message.innerHTML = `<h3>You guessed wrong!</h3><br/><h4>Your Total score is ${score}`
        score = 0
    }
}

function sequenceRun(num) {
    // get the all four divs with .box class,
    let squares = document.querySelectorAll(".box")
    num--
    // if playNum becomes less than 0 it only returns if statement code, 
    //otherwise it runs through if statement until the condition becomes true,
    if (num < 0) {
        inPlay = true
        return
    }
    // this code only runs in the function until the return statement occurs in if statement,
    let randomNum = Math.floor(Math.random() * gameColors.length)
    gameClicks.push(gameColors[randomNum])
    // we add randomNum in array to get random divs and push them in gameClicks Array,
    squares[randomNum].classList.add("active")
    setTimeout(() => {
        squares[randomNum].classList.remove("active")
        // Here the recursion occurs (main) when we only click button once only it only evokes after function and user get clicks,
        setTimeout(() => {
            sequenceRun(num)
        }, 100)
    }, 500)
}


