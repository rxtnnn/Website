const questions = [
    "How do you access an object’s property in JavaScript? | object.property | object(property) | *object['property'] | property of object",
    "Which keyword is used to declare a variable in JavaScript? | let | const | declare | *var",
    "How can you add an element to the end of an array? | array.add(element) | *array.push(element) | array.end(element) | array.append(element)",
    "What does 'NaN' represent in JavaScript? | Null and None | *Not a Number | Not a Node | Name and Number",
    "Which method can convert a JSON string into a JavaScript object? | JSON.convert() | *JSON.parse() | JSON.stringify() | JSON.objectify()",
    "How do you check if an array contains a specific value? | array.has(value) | array.includesValue(value) | array.contains(value) | *array.includes(value)",
    "What does 'this' refer to in JavaScript? | A new object | The window object | *The current object | A global object",
    "Which function returns a random number between 0 and 1? | Math.randomize() | Math.round() | *Math.random() | Math.floor()",
    "What is the correct syntax for an arrow function? | function(param) => {} | -> (param) {} | * (param) => {} | param => () {}",
    "How do you convert a string to an integer in JavaScript? | toInteger(string) | int(string) | *parseInt(string) | string.toInt()",
    "What is 'typeof' used for? | Converting data types | *Checking data type | Declaring a variable | Defining a function",
    "Which operator is used to concatenate strings? | & | concat | *+ | .",
    "How do you stop a loop in JavaScript? | exit | return | *break | stop",
    "How do you declare a constant variable in JavaScript? | let constant = value | *const variableName = value | var constant = value | constant variableName = value",
    "Which method removes the last item from an array? | array.drop() | array.deleteLast() | *array.pop() | array.remove()",
    "What does '==' check in JavaScript? | Equality with type | Inequality without type | *Equality without type | Inequality with type",
    "How do you comment a single line in JavaScript? | //comment// | #comment | << comment >> | *// comment",
    "What will 'typeof null' return in JavaScript? | function | null | undefined | *object",
    "Which function is used to set a timer in JavaScript? | setTimer() | *setTimeout() | setInterval() | timeout()",
    "What does '!=='' check in JavaScript? | *Not equal and type | Not equal | Equal and type | Equality and type"
];

function randomQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }
}
randomQuestions(questions); 
let firstPage = document.getElementById('firstPage');
let secondPage = document.getElementById('secondPage');
let thirdPage = document.getElementById('third-page');
let startBtn = document.getElementById('startbtn');

document.addEventListener('DOMContentLoaded', showPage);
function showPage() {
    startBtn.addEventListener('click', () => {
        firstPage.style.display = 'none';
        secondPage.style.display = 'block';   
        startTimer(); 
        displayQuestionsAndOptions(questions); 
    });
}

let q1 = document.getElementById('q1');
let q2 = document.getElementById('q2');
let opt1 = document.getElementById('option1-box');
let opt2 = document.getElementById('option2-box');

function displayQuestionsAndOptions(array) {
    randomQuestions(questions);
    let options1 = '';
    let options2 = '';
    let cleanOption;
    let option;
    for(let i = 0; i < 2; i++){
        let opts = array[i].split('|');

        if(i === 0){
            q1.innerHTML = opts[0].trim();
        }else{
            q2.innerHTML = opts[0].trim();
        }

        for(let j = 1; j <= 4; j++){
            option = opts[j].trim();
            cleanOption = option.replace('*', '').trim();
        
            if(i === 0){
                options1 += `<input class="form-check-input" type="radio" name="option1" id="option1-${j}" value="${cleanOption}">
                              <label class="form-check-label" for="option1-${j}">${cleanOption}</label><br>`;
            }else{
                options2 += `<input class="form-check-input" type="radio" name="option2" id="option2-${j}" value="${cleanOption}">
                              <label class="form-check-label" for="option2-${j}">${cleanOption}</label><br>`;
            }
        }
       
    }
    opt1.innerHTML = options1;
    opt2.innerHTML = options2;
    const q1Radios = document.querySelectorAll('input[name="option1"]');
    const q2Radios = document.querySelectorAll('input[name="option2"]');

    q1Radios.forEach(radio => radio.addEventListener('change', validateSelections));
    q2Radios.forEach(radio => radio.addEventListener('change', validateSelections));
}

let seconds = 0;
let minutes = 0;
let intervalId;
let display = document.getElementById('time');
let displayLastTime = document.getElementById('timer-last');
function startTimer() {
    intervalId = setInterval(timeStart, 1000);
}

function timeStart() {
    if(seconds === 59){
        seconds = 0;
        minutes++;
    }else{
        seconds++;
    }
    display.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer(){
    clearInterval(intervalId);  
    let lastTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    displayLastTime.innerHTML = `${lastTime}`;
}

let check = document.getElementById('checkBtn');
let next = document.getElementById('nextBtn');
function validateSelections() {
    var validX = false;
    var validY = false;
    
    var x = document.querySelectorAll('input[name="option1"]');
    var y = document.querySelectorAll('input[name="option2"]');

    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            validX = true;
            break; 
        }
    }

    for (var i = 0; i < y.length; i++) {
        if (y[i].checked) {
            validY = true;
            break;
        }
    }

    if(validX && validY){
        check.style.display = 'block';
        next.style.display = 'block';
    }else{
        check.style.display = 'none';
        next.style.display = 'none';
    }
    checkQuestion();
    nextQuestions();
}

function getCorrectAnswer(question){
    let options = question.split('|');
    let correctOption = options.find(option => option.includes('*'));
    console.log(correctOption);
    return correctOption ? correctOption.replace('*', '').trim() : null;
}

let correct1 = document.getElementById('correct1');
let correct2 = document.getElementById('correct2');
let isCheckClicked = false;

function checkQuestion(){
    let score = 0;
    checkBtn.addEventListener('click',()=>{
        if(!isCheckClicked){
            isCheckClicked = true;
            next.disabled = false;
            check.disabled = true;
            check.style.background = 'rgb(70, 70, 70)';
            next.style.background = 'transparent'; 
            correct1.style.display = 'inline-block';
            correct2.style.display = 'inline-block';

            const selected1 = document.querySelector('input[name="option1"]:checked');
            const selected2 = document.querySelector('input[name="option2"]:checked');

            if(selected1 && selected2){
                const answer1 = getCorrectAnswer(questions[0]);
                const answer2 = getCorrectAnswer(questions[1]);
                
                let resultMessage1 = '';
                let resultMessage2 = '';

                if(selected1.value === answer1){
                    questions.splice(questions[0],1); 
                    score++;
                    resultMessage1 = '<strong>Correct Answer!</strong>';
                }else{
                    questions.splice(questions[0], 1); 
                    questions.push(questions[0]); 
                    resultMessage1 = `<strong>Incorrect!<br> Correct Answer: ${answer1} </strong>`;
                }   

                if(selected2.value === answer2){
                    questions.splice(questions[1], 1); 
                    score++;
                    resultMessage2 = '<strong>Correct Answer!</strong>';
                }else{
                    questions.splice(questions[1], 1); 
                    questions.push(questions[1]); 
                    resultMessage2 = `<strong>Incorrect!<br> Correct Answer: ${answer2} </strong>`;
                }

                if(score === 20){
                    next.innerHTML = 'Submit'; 
                    next.addEventListener('click', () => {
                    secondPage.style.display = 'none';
                    thirdPage.style.display = 'inline-block';
                    stopTimer();
                    }); 
                }
                correct1.innerHTML = `${resultMessage1}`
                correct2.innerHTML = `${resultMessage2}`
            }
        }
    });
    
}

function nextQuestions(){
    next.addEventListener('click', () => {
        displayQuestionsAndOptions(questions);
        validateSelections(); 

        isCheckClicked = false; 
        next.disabled = true; 
        check.disabled = false;
        next.style.background = '';
        check.style.background = '';
        checkBtn.style.display = 'none'; 
        correct1.style.display = 'none';
        correct2.style.display = 'none';
    });
}

