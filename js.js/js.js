const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation")
const equalEl = document.querySelector(".equal")
const clearAllEl = document.querySelector(".all-clear")
const clearLastEl = document.querySelector(".last-entity-clear")

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;
const keyboard_Numbers_Operation = ["0","1","2","3","4","5","6","7","8","9",".","+","-","/","%"]



numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
        
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;

    });
});


//Функция ParseFloat принимает строку в качестве аргумента и возвращает десятичное число!
function mathOperation () {

    if (lastOperation === "x") {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num); 
    }else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num); 
    }else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num); 
    }else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num); 
    }
}

function clearVar(name = "Предыдущий расчет") {

    dis1Num += dis2Num + " " + name + " ";
    display1El.innerHTML = dis1Num;
    display2El.innerText = "",
    dis2Num= "";
    tempResultEl.innerText = result;
}

operationEl.forEach((operation)=> {
    operation.addEventListener("click", (e)=> {

        if (!dis2Num)return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        }else {
            result = parseFloat(dis2Num);
        }

        clearVar(operationName);
        lastOperation = operationName;
    });
});

equalEl.addEventListener("click", () => {

    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    dis2Num = result;
    dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "",
    result = "";
    tempResultEl.innerText = "";
});

clearLastEl.addEventListener("click", () => {
    display2El.innerText = "";
    dis2Num = "";
});

function clickOperation(key) {
    operationEl.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    });
}

function clickButtonE1(key) {
    numbersEl.forEach((button) => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

function clickEqual() {
    equalEl.click();
}

window.addEventListener("keydown", (e) => {
    keyboard_Numbers_Operation.forEach(item => {
        if (e.key === item) {
            clickButtonE1(e.key);
        }else if (e.key === item) {
            clickOperation(e.key);
        }else if (e.key === "*") {
            clickOperation("x");
        }else if (e.key == "Enter" || e.key ==="=") {
            clickEqual();
        }
    })
})

