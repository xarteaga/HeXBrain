/**
 * Created by vaxi on 10/15/16.
 */
var MAX_TIME = 30000;
var INT_TIME = 100;

var difficulty = 4,
    number_todo = 0,
    number,
    left_time = 1000,
    aswered = false,
    answer_text = "",
    timer = null;

function panels_next() {
    // Hide the previous object
    $(".current-panel").toggleClass("current-panel prev-panel");

    // Show current Object
    timer = setTimeout(
        function () {
            $(".next-panel").toggleClass("next-panel current-panel");
        }, 100);


    // Remove the panel/page after being hidden
    setTimeout(function () {
        //prevObj.className += "hidden";
        $(".prev-panel").remove();
    }, 1100);
}

function init() {
    $(".next-panel").toggleClass("next-panel current-panel");
}

function start() {
    var row = document.createElement("div");
    row.className = "row";
    $(".quizbox")[0].appendChild(row);

    var box = document.createElement("div");
    box.id = "startpage";
    box.className = "box panel panel-default next-panel";
    box.innerHTML = "<div class='centered'>" +
        "<h3>Select the difficulty:</h3>" +
        "<p></p><button type='button' class='btn btn-primary btn-lg' onclick='setDifficulty(1)'>" +
        "<span class='glyphicon glyphicon-eye-open'></span> Easy" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-success btn-lg' onclick='setDifficulty(2)'>" +
        "<span class='glyphicon glyphicon-leaf'></span> Normal" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-info btn-lg' onclick='setDifficulty(3)'>" +
        "<span class='glyphicon glyphicon-flash'></span> Hard" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-warning btn-lg' onclick='setDifficulty(4)'>" +
        "<span class='glyphicon glyphicon-tower'></span> Very hard" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-danger btn-lg' onclick='setDifficulty(5)'>" +
        "<span class='glyphicon glyphicon-fire'></span> Intense" +
        "</button></p><br></div>";
    row.appendChild(box);

    panels_next();
}

function setDifficulty(dif) {
    /* Set difficulty */
    difficulty = dif;

    /* Create Row */
    var row = document.createElement("div");
    row.className = "row";
    $(".quizbox")[0].appendChild(row);

    /* Create sliding box */
    var box = document.createElement("div");
    box.id = "startpage";
    box.className = "box panel panel-default next-panel";
    box.innerHTML = "<div class='centered'>" +
        "<h3>How many do you want to do:</h3>" +
        "<p></p><button type='button' class='btn btn-primary btn-lg' onclick='setNumberTodo(10)'>" +
        "<span class='glyphicon glyphicon-eye-open'></span> 10" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-success btn-lg' onclick='setNumberTodo(20)'>" +
        "<span class='glyphicon glyphicon-leaf'></span> 20" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-info btn-lg' onclick='setNumberTodo(30)'>" +
        "<span class='glyphicon glyphicon-flash'></span> 30" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-warning btn-lg' onclick='setNumberTodo(40)'>" +
        "<span class='glyphicon glyphicon-tower'></span> 40" +
        "</button></p>" +
        "<p><button type='button' class='btn btn-danger btn-lg' onclick='setNumberTodo(50)'>" +
        "<span class='glyphicon glyphicon-fire'></span> 50" +
        "</button></p><br></div>";
    row.appendChild(box);

    /* Slide panel/box */
    panels_next();
}

function setNumberTodo(num) {
    /* Set number */
    number_todo = num;

    NextNumber();
}

function RandomNumber() {
    switch(difficulty) {
        case 1:
            min = 10;
            max = 15;
            break;
        case 2:
            min = 10;
            max = 159;
            break;
        case 3:
            min = 16;
            max = 159;
            break;
        case 4:
            min = 159;
            max = 255;
            break;
        case 5:
        default:
            min = 160;
            max = 2559;
    }
    var number = Math.round((Math.random() * (max - min)) + min);

    return {
        hex: number.toString(16).toUpperCase(),
        dec: number.toString(10).toUpperCase()
    }
}

function tick() {
    left_time = left_time - INT_TIME;

    bar = $(".progress-bar")[0];
    bar.setAttribute("aria-valuenow", (left_time).toString());
    bar.setAttribute("style", "width: " + (100.0 / MAX_TIME * left_time).toString() + "%");
    bar.innerText = (left_time / 1000.0).toString() + " s   ";

    if (left_time > MAX_TIME * 4 / 5) {
        bar.className = "progress-bar progress-bar-success progress-bar-striped active ";
    } else if (left_time > MAX_TIME * 3 / 5) {
        bar.className = "progress-bar progress-bar-default progress-bar-striped active ";
    } else if (left_time > MAX_TIME * 2 / 5) {
        bar.className = "progress-bar progress-bar-info progress-bar-striped active ";
    } else if (left_time > MAX_TIME * 1 / 5) {
        bar.className = "progress-bar progress-bar-warning progress-bar-striped active ";
    } else {
        bar.className = "progress-bar progress-bar-danger progress-bar-striped active ";
    }

    if (left_time >= INT_TIME && answered == false) {
        timer = setTimeout(tick, INT_TIME);
    } else if (answered == false) {
        AnswerFail();
        tiemr = null;
    } else {
        timer = null;
    }
}

function NextNumber() {
    /* Random number */
    number = RandomNumber();
    console.log("Next number: 0x" + number.hex + ", " + number.dec);

    /* Create Row */
    var row = document.createElement("div");
    row.className = "row";
    $(".quizbox")[0].appendChild(row);

    /* Create sliding box */
    box = document.createElement("div");
    box.id = "startpage";
    box.className = "box panel panel-default next-panel";
    row.appendChild(box);

    temp = document.createElement("div");
    temp.className = "prompt-display";
    text = document.createElement("p");
    text.className = "prompt-text";
    text.innerText = "" + number.hex;
    temp.appendChild(text);
    box.appendChild(temp);

    temp = document.createElement("div");
    temp.className = "guess-display guess-display-default";
    text = document.createElement("p");
    text.className = "guess-text";
    text.innerText = "???";
    temp.appendChild(text);
    box.appendChild(temp);

    temp = document.createElement("div");
    temp.className = "numpad";
    box.appendChild(temp);

    for (c = 0; c < 3; c++) {
        for (r = 0; r < 4; r++) {
            var btn = document.createElement("button");
            if (r != 3) {
                btn.className = "btn btn-default btn-large numpad-btn numpad-col" + (c + 1).toString() + " numpad-row" + (r + 1).toString();
                btn.innerText = (3 * r + c + 1).toString();
                btn.setAttribute("OnClick", "AnswerConcat(" + (3 * r + c + 1).toString() + ")");
            } else {
                if (c == 2) {
                    btn.className = "btn btn-success btn-large numpad-btn numpad-col" + (c + 1).toString() + " numpad-row" + (r + 1).toString();
                    btn.innerHTML = "<span class='glyphicon glyphicon-send' aria-hidden='true'></span>";
                    btn.setAttribute("OnClick", "AnswerSubmit()");
                } else if (c == 1) {
                    btn.className = "btn btn-default btn-large numpad-btn numpad-col" + (c + 1).toString() + " numpad-row" + (r + 1).toString();
                    btn.innerText = "0";
                    btn.setAttribute("OnClick", "AnswerConcat(0)");
                } else {
                    btn.className = "btn btn-danger btn-large numpad-btn numpad-col" + (c + 1).toString() + " numpad-row" + (r + 1).toString();
                    btn.innerHTML = "<span class='glyphicon glyphicon-erase' aria-hidden='true'></span>";
                    btn.setAttribute("OnClick", "AnswerErase()");
                }
            }
            temp.appendChild(btn);
        }
    }

    temp = document.createElement("div");
    temp.className = "progress";
    box.appendChild(temp);

    left_time = MAX_TIME;
    answered = false;
    answer_text = "";

    bar = document.createElement("div");
    bar.className = "progress-bar progress-bar-success progress-bar-striped active";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-valuemin", "0");
    bar.setAttribute("aria-valuemax", MAX_TIME);
    bar.setAttribute("aria-valuenow", (left_time).toString());
    bar.setAttribute("style", "width: " + (100.0 / MAX_TIME * left_time).toString() + "%");
    bar.innerText = (left_time / 1000.0).toString() + " s   ";
    bar.innerText = (left_time / 1000.0).toString() + " s";

    temp.appendChild(bar);

    /* Slide panel/box */
    panels_next();
    setTimeout(function () {
        timer = setTimeout(tick, INT_TIME);
    }, 1000);
}

function AnswerConcat(text) {
    if (answer_text.length < 10) {
        answer_text += text;
        guess_text = $(".guess-text")[0];

        $(".guess-text")[0].innerHTML = answer_text;
    }
}

function AnswerErase(text) {
    if (answer_text.length > 0) {
        answer_text = answer_text.substring(0, answer_text.length - 1);

        if (answer_text.length > 0) {
            $(".guess-text")[0].innerHTML = answer_text;
        } else {
            $(".guess-text")[0].innerHTML = "???";
        }
    }
}

function AnswerSubmit() {
    if (answer_text == number.dec) {
        AnswerSuccess();
    } else {
        AnswerFail();
    }
}

function AnswerSuccess() {
    $(".guess-display-default").toggleClass("guess-display-default guess-display-success");
    answered = true;
    if (timer != null) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(NextNumber, 1000);
}

function AnswerFail() {
    $(".guess-display-default").toggleClass("guess-display-default guess-display-fail");
    answered = true;
    if (timer != null) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(GameOver, 1000);
}

function GameOver() {
    /* Create Row */
    var row = document.createElement("div");
    row.className = "row";
    $(".quizbox")[0].appendChild(row);

    /* Create sliding box */
    box = document.createElement("div");
    box.id = "startpage";
    box.className = "box panel panel-default next-panel game-over-box";
    row.appendChild(box);

    /* Create Game Over message */
    temp = document.createElement("p");
    temp.className = "game-over-text";
    temp.innerHTML = "Game Over!"
    box.appendChild(temp);

    temp = document.createElement("p");
    temp.className = "game-over-prompt";
    temp.innerHTML = "Touch the skull to start again!"
    box.appendChild(temp);

    /* Create Game Over skull */
    temp = document.createElement("span");
    temp.className = "game-over-skull";
    temp.innerHTML = "&#9760;";
    temp.onclick = start;
    box.appendChild(temp);

    /* Slide panel/box */
    panels_next();
}

setTimeout(init, 1000);

