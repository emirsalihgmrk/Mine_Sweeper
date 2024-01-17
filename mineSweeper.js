let gameBoard = document.querySelector(".gameBoard");
let flagText = document.querySelector("#flagText");
let clockText = document.querySelector("#clockText");
let timeText = document.querySelector("#timeText");
let timeRecordText = document.querySelector("#timeRecordText");
let firstClock = document.querySelector(".firstClock");
let secondClock = document.querySelector(".secondClock");
let mainItems = document.querySelector(".mainItems");
let container = document.querySelector(".container");
let mainMenu = document.querySelector(".mainMenu");
let gameSize = document.querySelector("#gameSize");
let selectSize = document.querySelector("#selectSize");
let list1 = document.querySelector("#list1");
let list2 = document.querySelector("#list2");
let menu = document.querySelector("#menu");
let mine = document.querySelector("#mine");
let flag = document.createElement("img");
let bestTime;
flag.src = "https://cdn.icon-icons.com/icons2/510/PNG/512/flag_icon-icons.com_50393.png"
flag.id = "flag"
flag.classList.add("flag")
let rows = 10;
let cols = 10;
let mineCount = 15;
let flagCount = 15;
let mineSweeper;
function run() {
    mineSweeper = randomItem(createBoard(rows, cols))
    for (let i = 0; i < mineSweeper.length; i++) {
        for (let j = 0; j < mineSweeper[i].length; j++) {
            mineSweeper[i][j].addEventListener("click", function (event) {
                event.preventDefault();
                clickBox(mineSweeper, i, j)
            })
            mineSweeper[i][j].addEventListener("contextmenu", function (event) {
                event.preventDefault();
                EventOfFlag(mineSweeper, i, j)
            })
        }
    }
}
function createBoard(rows, cols) {
    let board = [];
    for (let i = 0; i < rows; i++) {
        let row = []
        for (let j = 0; j < cols; j++) {
            let button = document.createElement("button")
            if ((i + j) % 2 == 0) {
                button.classList.add("button")
            } else {
                button.classList.add("button2")
            }

            row.push(button);
            gameBoard.appendChild(button)
        }
        board.push(row)
    }
    return board;
}
function randomItem(array) {
    for (i = 0; i < mineCount; i++) {
        let random, random2;
        do {
            random = Math.floor(Math.random() * array.length)
            random2 = Math.floor(Math.random() * array[0].length)
        } while (array[random][random2].querySelector("#mine"));
        array[random][random2].appendChild(document.querySelector("#mine").cloneNode(true));
    }
    return array;
}
let clickCounter = 0;
function clickBox(array, i, j) {
    let counter = 0;
    let left = j - 1;
    let right = j + 1;
    let up = i - 1;
    let down = i + 1;
    if (array[i][j].querySelector("#mine") && (!array[i][j].querySelector("#flag"))) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j].disabled = true;
            }
        }
        clickCounter = 0;
        flagCount = 0;
        array[i][j].querySelector("#mine").style.visibility = "visible";
        timeText.textContent = "-----";
        firstClock.style.width = "60px";
        clearTimeout(timeoutId);
        hour = 0;
        min = 0;
        sec = 0;
        showMine(array);
    } else if (!array[i][j].querySelector("#flag")) {
        if (left >= 0) {
            if (array[i][left].querySelector("#mine")) {
                counter++;
            }
        }
        if (right < array[i].length) {
            if (array[i][right].querySelector("#mine")) {
                counter++;
            }
        }
        if (up >= 0) {
            if (array[up][j].querySelector("#mine")) {
                counter++;
            }
        }
        if (down < array.length) {
            if (array[down][j].querySelector("#mine")) {
                counter++;
            }
        }
        if ((up >= 0) && (left >= 0)) {
            if (array[up][left].querySelector("#mine")) {
                counter++;
            }
        }
        if ((up >= 0) && (right < array[i].length)) {
            if (array[up][right].querySelector("#mine")) {
                counter++;
            }
        }
        if ((down < array.length) && (left >= 0)) {
            if (array[down][left].querySelector("#mine")) {
                counter++;
            }
        }
        if ((down < array.length) && (right < array[i].length)) {
            if (array[down][right].querySelector("#mine")) {
                counter++;
            }
        }
        if ((i + j) % 2 == 0) {
            array[i][j].style.backgroundColor = "rgb(246, 240, 186)";
        } else {
            array[i][j].style.backgroundColor = "rgb(250, 246, 215)";
        }
        if (counter != 0) {
            array[i][j].textContent = counter;
            if (counter == 1) { array[i][j].style.color = "#87CEFA" }
            if (counter == 2) { array[i][j].style.color = "#00FF00" }
            if (counter == 3) { array[i][j].style.color = "#FF0000" }
            if (counter == 4) { array[i][j].style.color = "#800080" }
            if (counter == 5) { array[i][j].style.color = "#FFA500" }
            if (counter == 6) { array[i][j].style.color = "#FF00FF" }
            if (counter == 7) { array[i][j].style.color = "#000080" }
            if (counter == 8) { array[i][j].style.color = "#A52A2A" }
        }
    }
    if (clickCounter == array.length ** 2 - mineCount - 1) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                array[i][j].disabled = true;
            }
        }
        flagCount = 0;
        clearTimeout(timeoutId);
        timeText.textContent = updateTime(hour,min,sec);
        if((timeRecordText.textContent==="-----")||(bestTime > hour*3600+min*60+sec)){
            bestTime = hour*3600+min*60+sec;
            timeRecordText.textContent = updateTime(hour,min,sec);
        }
        firstClock.style.width = "120px";
        secondClock.style.width = "120px";
        hour = 0;
        min = 0;
        sec = 0;
        container.style.display = "block"
        document.querySelector("#h1").textContent = "You Win"
    }
    clickCounter++;
}
function showMine(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j].querySelector("#mine")) {
                setTimeout(() => {
                    if (array[i][j].querySelector("#flag")) {
                        array[i][j].removeChild(array[i][j].querySelector("#flag"))
                    }
                    array[i][j].querySelector("#mine").style.visibility = "visible";
                }, i * 300 + j * 300);
            }
        }
    }
    document.querySelector("#h1").textContent = "You Lost"
    setTimeout(() => {
        container.style.display = "block";
    }, 6000);
}
function EventOfFlag(array, i, j) {
    if ((flagCount != 0) && (array[i][j].querySelector("#flag") === null) && (getComputedStyle(array[i][j]).backgroundColor !== "rgb(246, 240, 186)") && (getComputedStyle(array[i][j]).backgroundColor !== "rgb(250, 246, 215)")) {
        array[i][j].appendChild(flag.cloneNode(true))
        flagCount--;
        flagText.textContent = flagCount;
    } else if (array[i][j].querySelector("#flag")) {
        array[i][j].removeChild(array[i][j].querySelector("#flag"))
        flagCount++;
        flagText.textContent = flagCount;
    }
}
let restart = document.querySelector("#restart")
restart.addEventListener("click", function () {
    clickCounter = 0;
    if (rows == 10) {
        flagCount = 15;
    } else {
        flagCount = 35;
    }
    container.style.display = "none";
    flagText.textContent = flagCount;
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    run();
    timer();
})
selectSize.style.display = "none";
gameSize.addEventListener("click", function () {
    selectSize.style.display = selectSize.style.display === "none" ? "block" : "none";
})


menu.addEventListener("click", function () {
    mainItems.style.display = "none";
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild)
    }
    mainMenu.style.display = "block";
    container.style.display = "none";
})
list1.addEventListener("click", function () {
    rows = 10;
    cols = 10;
    mineCount = 15;
    flagCount = 15;
    gameBoard.style.gridTemplateRows = "repeat(10,60px)"
    gameBoard.style.gridTemplateColumns = "repeat(10,60px)"
    list1.style.color = "blueviolet";
    list2.style.color = "black";
})
list2.addEventListener("click", function () {
    rows = 15;
    cols = 15;
    mineCount = 35;
    flagCount = 35;
    gameBoard.style.gridTemplateRows = "repeat(15,40px)";
    gameBoard.style.gridTemplateColumns = "repeat(15,40px)";
    mine.style.height = "25px";
    flag.style.height = "30px";
    list2.style.color = "blueviolet";
    list1.style.color = "black";
})
let play = document.querySelector("#play")
play.addEventListener("click", function () {
    mainItems.style.display = "block";
    clickCounter = 0;
    if (rows == 10) {
        flagCount = 15;
    } else {
        flagCount = 35;
    }
    mainMenu.style.display = "none";
    selectSize.style.display = "none";
    flagText.textContent = flagCount;
    run();
    timer();
})
let hour = 0;
let min = 0;
let sec = 0;
let timeoutId;
function timer(){
    clockText.textContent = updateTime(hour,min,sec);
    sec++;
    if(sec==60){
        sec = 0;
        min++;
    }
    if(min==60){
        min = 0;
        hour++;
    }
    if(hour==60){
        hour = 0;
    }
    timeoutId = setTimeout(timer,1000);
}
function updateTime(hour,min,sec){
    sec = sec < 10 ? "0" + sec : sec;
    min = min < 10 ? "0" + min : min;
    hour = hour < 10 ? "0" + hour : hour;
    return hour + ":" + min + ":" + sec;
}





