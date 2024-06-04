let text = `La luna es un satélite natural de la Tierra. Es el objeto más brillante en el cielo después del Sol, aunque su superficie es oscura. La luna brilla porque refleja la luz del Sol. La Luna no tiene luz propia, solo refleja la luz del Sol. La Luna gira alrededor de la Tierra. Tarda 27,3 días en completar una órbita alrededor de la Tierra. Este tiempo se llama mes lunar. La Luna gira sobre su eje a la misma velocidad que gira alrededor de la Tierra, por eso siempre vemos la misma cara de la Luna.
La Luna es el único cuerpo celeste al que el ser humano ha llegado en persona. La primera misión tripulada que llegó a la Luna fue la misión Apolo 11 en 1969. Neil Armstrong fue el primer ser humano en caminar sobre la superficie lunar. La tripulación de la Apolo 11 estaba compuesta por tres astronautas: Neil Armstrong, Edwin "Buzz" Aldrin y Michael Collins. Armstrong y Aldrin caminaron sobre la Luna, mientras que Collins permaneció en la órbita lunar.
La superficie de la Luna es muy irregular. Está cubierta de cráteres de impacto y montañas. También hay mares lunares, que en realidad son planicies basálticas. La Luna no tiene atmósfera, por lo tanto, no hay viento ni lluvia en la Luna. Las temperaturas en la Luna son extremas. Durante el día, la temperatura puede llegar hasta 127 °C. Durante la noche, puede bajar hasta -173 °C.
La Luna afecta las mareas en la Tierra. Las mareas son movimientos periódicos del nivel del mar que se producen como resultado de la atracción gravitatoria de la Luna y el Sol sobre la Tierra. Las mareas altas y bajas se suceden aproximadamente cada 12 horas y 25 minutos. Estos movimientos afectan a los océanos y a las costas.`;

// Convertimos el texto en un array de palabras
let words = text.split(/\s+/);

let index = 0;
let wpm = 200;
let interval;

function updateWord() {
    let word = words[index];
    let midIndex = 0;
    document.getElementById('wordDisplay').innerHTML = "<span class='left-word'>" + word.substring(0, midIndex) + "</span>" + 
        "<span class='highlight-letter'>" + word[midIndex] + "</span>" + 
        word.substring(midIndex + 1);

    updateTeleprompter();
}

function updateTeleprompter() {
    let textDisplay = document.getElementById('textDisplay');
    let highlightedText = words.map((w, i) => {
        if (i === index) {
            return `<span class='highlight-word'>${w}</span>`;
        } else {
            return w;
        }
    }).join(' ');
    textDisplay.innerHTML = highlightedText;
}

function togglePlayPause() {
    let button = document.getElementById('playPauseIcon');
    if (interval) {
        clearInterval(interval);
        interval = null;
        button.classList.remove('fa-pause');
        button.classList.add('fa-play');
    } else {
        interval = setInterval(() => {
            if (index < words.length - 1) {
                index++;
                updateWord();
            } else {
                clearInterval(interval);
                interval = null;
            }
        }, 60000 / wpm);
        button.classList.remove('fa-play');
        button.classList.add('fa-pause');
    }
}

function pause() {
    clearInterval(interval);
    interval = null;
    document.getElementById('playPauseIcon').classList.remove('fa-pause');
    document.getElementById('playPauseIcon').classList.add('fa-play');
}

function play() {
    if (!interval) {
        interval = setInterval(() => {
            if (index < words.length - 1) {
                index++;
                updateWord();
            } else {
                clearInterval(interval);
                interval = null;
            }
        }, 60000 / wpm);
        document.getElementById('playPauseIcon').classList.remove('fa-play');
        document.getElementById('playPauseIcon').classList.add('fa-pause');
    }
}

function changeSpeed() {
    let newWpm = parseInt(document.getElementById('wpmInput').value);
    wpm = Math.max(10, newWpm);
    if (interval) {
        clearInterval(interval);
        interval = setInterval(() => {
            if (index < words.length - 1) {
                index++;
                updateWord();
            } else {
                clearInterval(interval);
                interval = null;
            }
        }, 60000 / wpm);
    }
}

function moveWords(direction) {
    let numWords = parseInt(document.getElementById('wordsInput').value) * direction;
    pause();
    index = Math.max(0, Math.min(words.length - 1, index + numWords));
    updateWord();
}

updateWord();
updateTeleprompter();