let correctWord = '';
getCorrectWord();

// States: white, gray, yellow, green.
let letters = [
    { letter: 'q', state: 'white' },
    { letter: 'w', state: 'white' },
    { letter: 'e', state: 'white' },
    { letter: 'r', state: 'white' },
    { letter: 't', state: 'white' },
    { letter: 'y', state: 'white' },
    { letter: 'u', state: 'white' },
    { letter: 'i', state: 'white' },
    { letter: 'o', state: 'white' },
    { letter: 'p', state: 'white' },
    { letter: 'å', state: 'white' },
    { letter: 'a', state: 'white' },
    { letter: 's', state: 'white' },
    { letter: 'd', state: 'white' },
    { letter: 'f', state: 'white' },
    { letter: 'g', state: 'white' },
    { letter: 'h', state: 'white' },
    { letter: 'j', state: 'white' },
    { letter: 'k', state: 'white' },
    { letter: 'l', state: 'white' },
    { letter: 'ö', state: 'white' },
    { letter: 'ä', state: 'white' },
    { letter: 'z', state: 'white' },
    { letter: 'x', state: 'white' },
    { letter: 'c', state: 'white' },
    { letter: 'v', state: 'white' },
    { letter: 'b', state: 'white' },
    { letter: 'n', state: 'white' },
    { letter: 'm', state: 'white' }
];

let keyboard = document.querySelectorAll('.grid-item');
for (let key of keyboard) {
    key.addEventListener("click", function () {
        click(key.innerText);
    });
}

let rows = document.querySelector('.answers').querySelectorAll('.grid-container');
let answerCount = 0;
let letterIndex = 0;

function click(letter) {
    if (answerCount >= 6) {
        return;
    }
    if (letter == 'back') {
        if (letterIndex > 0) {
            letterIndex--;
            let p = rows[answerCount].querySelectorAll('.answer-box')[letterIndex].querySelector('p');
            p.innerText = null;
        }
    } else if (letter == 'enter') {
        if (letterIndex == 5) {
            let row = rows[answerCount].querySelectorAll('.answer-box');
            let word = '';
            row.forEach(box => {
                let p = box.querySelector('p');
                word += p.innerText;
            });

            if (words.findIndex(a => a == word) == -1) {
                alert('Not a word!');
            } else {
                for (let i in word) {
                    let w = word[i];
                    if (correctWord[i] == w) {
                        let l = letters.find(o => o.letter == w);
                        l.state = 'green';
                        row[i].style = 'background-color: lightgreen';
                    } else if (correctWord.indexOf(w) > -1) {
                        let l = letters.find(o => o.letter == w);
                        if (l.state != 'green') {
                            l.state = 'yellow';
                        }
                        row[i].style = 'background-color: yellow';
                    } else {
                        let l = letters.find(o => o.letter == w);
                        if (l.state != 'green' || l.state != 'yellow') {
                            l.state = 'gray';
                        }
                        row[i].style = 'background-color: gray; color: white';
                    }
                }

                updateKeyboard();

                if (answerCount < 6) {
                    answerCount++;
                    letterIndex = 0;
                }
            }
        }
    } else if (letterIndex < 5) {
        let p = rows[answerCount].querySelectorAll('.answer-box')[letterIndex].querySelector('p');
        p.innerText = letter;
        letterIndex++; 
    }
}

let words = [];
getText();

function updateKeyboard() {
    for (let key of keyboard) {
        let val = key.querySelector('p').innerText;
        let letter = letters.find(l => l.letter == val);
        if (letter) {
            if (letter.state == 'white') {
                key.style = 'background-color: #e5e5e5';
            } else if (letter.state == 'gray') {
                key.style = 'background-color: gray; color: white';
            } else if (letter.state == 'yellow') {
                key.style = 'background-color: yellow';
            } else if (letter.state == 'green') {
                key.style = 'background-color: lightgreen';
            }
        }
    }
}

function getCorrectWord() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/JEPPSER/ordle/main/word.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                correctWord = request.responseText;
                return request.responseText;
            }
        }
    }
}

function getText(){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/almgru/svenska-ord.txt/master/svenska-ord.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                let arr = request.responseText.split('\n');
                words = arr.filter(a => a.length == 5);
                return request.responseText;
            }
        }
    }
}