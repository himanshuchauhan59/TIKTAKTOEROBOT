let col = document.getElementsByClassName("col");
let turn = true, gettingWinner = { isTrue: false };
let playerMovement = [];
let robotMovement = [];
const winCase = [
    ["boxR1C1", "boxR1C2", "boxR1C3"],
    ["boxR2C1", "boxR2C2", "boxR2C3"],
    ["boxR3C1", "boxR3C2", "boxR3C3"],
    ["boxR1C1", "boxR2C1", "boxR3C1"],
    ["boxR1C2", "boxR2C2", "boxR3C2"],
    ["boxR1C3", "boxR2C3", "boxR3C3"],
    ["boxR1C1", "boxR2C2", "boxR3C3"],
    ["boxR1C3", "boxR2C2", "boxR3C1"],
]

let elementChecker = {
    boxR1C1: { isFilled: false, },
    boxR1C2: { isFilled: false, },
    boxR1C3: { isFilled: false, },
    boxR2C1: { isFilled: false, },
    boxR2C2: { isFilled: false, },
    boxR2C3: { isFilled: false, },
    boxR3C1: { isFilled: false, },
    boxR3C2: { isFilled: false, },
    boxR3C3: { isFilled: false, },
}

// clicker for every element.
{
    if (turn) {
        document.getElementById("player").style.borderBottom = "2px solid white";
        document.getElementById("robot").style.borderBottom = "none";
    }
    for (let element of col) {
        document.getElementById(element.id).addEventListener("click", () => {
            if (turn) {
                playerClick(element);
            } 
            // else {
            //     robotClick(element);
            // }
        })
    }
}

const robotClick = (element) => {
    if (elementChecker[element.id].isFilled) {
        return;
    }
    checkElement(element, turn);
    checkWinner(element);
    document.getElementById("player").style.borderBottom = "2px solid white";
    document.getElementById("robot").style.borderBottom = "none";
    element.classList.add("robot");
    element.innerHTML = "X";
    turn = true;
}

const playerClick = (element) => {
    if (elementChecker[element.id].isFilled) {
        return;
    }
    document.getElementById("robot").style.borderBottom = "2px solid white";
    document.getElementById("player").style.borderBottom = "none";
    element.classList.add("player");
    element.innerHTML = "O";
    checkElement(element, turn);
    checkWinner(element);
    turnOnRobot(element);
    turn = false;
}

const checkWinner = (element) => {
    if (turn) {
        playerMovement.push(element.id)
        console.group("player movement");
        console.table(playerMovement)
        console.groupEnd();
    } else {
        robotMovement.push(element.id)
        console.group("robot movement");
        console.table(robotMovement)
        console.groupEnd();
    }
    console.group();
    if (playerMovement.length >= 3 || robotMovement.length >= 3) {
        // for (let i = 0; i < winCase.length; i++) {
        if (turn) {
            checkOnElementsWithEvery(playerMovement, winCase)
            if (gettingWinner.isTrue) {
                // console.log("Player is winner")
                alert("Player is Winner")
            }
        } else {
            checkOnElementsWithEvery(robotMovement, winCase)
            if (gettingWinner.isTrue) {
                // console.log("Robot is winner")
                alert("Robot is Winner")
            }
        }
        // }
    }
    console.groupEnd();
}

const checkElement = (element, turn) => {
    let id = element.id;
    elementChecker[id].isFilled = true;
    elementChecker[id].player = turn;
    console.clear();
    console.log(elementChecker)
}

const checkOnElementsWithEvery = (arrayFromFilter, arrayWithinFileter) => {
    if (arrayFromFilter.length > 3) {
        for (let i = 0; i < arrayWithinFileter.length; i++) {
            let count = 0;
            while (count != arrayFromFilter.length) {
                let resultArray = arrayFromFilter.slice();
                resultArray.splice(count, 1)
                let checkWin = resultArray.every((e) => arrayWithinFileter[i].includes(e));
                if (checkWin) {
                    count = arrayFromFilter.length;
                    gettingWinner.isTrue = true;
                    break;
                }
                console.log("check win in while: ", checkWin);
                count++;
            }
        }
    } else {
        let checkWin = arrayFromFilter.every((e) => arrayWithinFileter.includes(e));
        console.log("check win : ", checkWin);
        gettingWinner.isTrue = true;
        return;
    }
}

const turnOnRobot = (element) => {
    let arrayOfElements = [];
    for (let key in elementChecker) {
        arrayOfElements.push(key);
    }
    let index = arrayOfElements.indexOf(element.id);
    setTimeout(() => {
        if (index == arrayOfElements.length) {
            robotClick(document.getElementById(arrayOfElements[--index]))
        } else {
            robotClick(document.getElementById(arrayOfElements[++index]))
        }
    }, 2000);
}


