const palabras = [
    "Había", "una", "vez", "en", "el", "lejano", "reino", "de", "Encantoville,", "un", "pueblo", "encantador",
    "donde", "la", "magia", "fluía", "como", "el", "aire", "que", "respiraban", "sus", "habitantes.", "En", "este",
    "mágico", "rincón", "del", "mundo", "vivía", "una", "niña", "llamada", "Isabella,", "cuya", "curiosidad", "era",
    "tan", "grande", "como", "la", "inmensidad", "del", "cielo", "nocturno.", "Un", "día,", "mientras", "paseaba",
    "por", "las", "pintorescas", "calles", "de", "Encantoville,", "Isabella", "sintió", "la", "llamada", "de",
    "la", "aventura.", "Decidió", "explorar", "el", "bosque", "mágico", "que", "se", "erguía", "majestuosamente",
    "cerca", "de", "su", "acogedora", "casa.", "Caminó", "entre", "árboles", "altos", "que", "parecían", "tocar",
    "el", "cielo", "y", "flores", "brillantes", "que", "iluminaban", "el", "camino", "con", "colores", "deslumbrantes.",
    "El", "bosque", "resonaba", "con", "susurros", "mágicos", "y", "el", "murmullo", "del", "arroyo", "que", "corría",
    "junto", "a", "ella.", "De", "repente,", "entre", "las", "sombras", "del", "bosque,", "Isabella", "se", "encontró",
    "con", "una", "criatura", "mágica", "que", "brillaba", "con", "una", "luz", "resplandeciente.", "La", "criatura",
    "se", "le", "acercó", "y", "le", "preguntó:", "'Hola,", "¿dónde", "estás?", "¿Quieres", "acompañarme", "en", "una",
    "aventura?'", "Isabella", "sonrió", "con", "emoción", "y", "respondió:", "'¡Claro!", "Vamos", "juntos.'",
    "Emocionada", "por", "la", "perspectiva", "de", "una", "nueva", "aventura,", "Isabella", "y", "la", "criatura",
    "mágica", "se", "adentraron", "en", "el", "bosque.", "A", "cada", "paso,", "descubrían", "maravillas", "ocultas",
    "y", "se", "encontraban", "con", "seres", "mágicos", "que", "saludaban", "a", "Isabella", "con", "cánticos", "melódicos.",
    "El", "bosque", "se", "volvía", "más", "denso", "y", "misterioso,", "y", "la", "luz", "del", "sol", "se", "filtraba",
    "entre", "las", "hojas", "creando", "un", "tapiz", "de", "luces", "y", "sombras.", "Isabella", "se", "maravillaba",
    "con", "cada", "rincón", "del", "bosque", "y", "se", "preguntaba", "qué", "otras", "aventuras", "le", "depararía",
    "este", "mágico", "lugar."
];

let indice = 0;
let intervalo;
let velocidad = 200;
let pausado = false;

function imprimirPalabra() {
    if (pausado) {
        return;
    }

    const palabra = palabras[indice];
    const longitud = palabra.length;
    const mitad = Math.floor(longitud / 2);

    const palabraFormateada =
        '<div class="center-container">' +
        palabra.substring(0, mitad) +
        '<span>' +
        palabra.charAt(mitad) +
        '</span>' +
        palabra.substring(mitad + 1) +
        '</div>';

    document.getElementById('output').innerHTML = palabraFormateada;
    indice++;

    if (indice >= palabras.length) {
        clearInterval(intervalo);
    }
}

function pausarImpresion() {
    pausado = true;
    document.getElementById('btnPauseImg').src = 'play_pausa.png';
    document.getElementById('btnPause').setAttribute('onclick', 'reanudarImpresion()');
    actualizarVelocidad(); // Agrega esta línea para actualizar la velocidad al pausar
}

function reanudarImpresion() {
    pausado = false;
    document.getElementById('btnPauseImg').src = 'pausa.png';
    document.getElementById('btnPause').setAttribute('onclick', 'pausarImpresion()');
    actualizarVelocidad(); // Agrega esta línea para actualizar la velocidad al reanudar
}

function actualizarVelocidad() {
    velocidad = 60000 / document.getElementById('speedSlider').value;
    document.getElementById('speedValue').innerText = document.getElementById('speedSlider').value;
    if (!pausado && intervalo) {
        clearInterval(intervalo);
        intervalo = setInterval(imprimirPalabra, velocidad);
    }
}

function iniciarImpresion() {
    if (intervalo) {
        clearInterval(intervalo);
    }
    indice = 0;
    pausado = false;
    document.getElementById('speedSlider').value = 500; // Establecer el valor predeterminado del slider
    actualizarVelocidad();
    intervalo = setInterval(imprimirPalabra, velocidad);
}



document.getElementById('btnPause').addEventListener('click', function () {
    if (pausado) {
        reanudarImpresion();
    } else {
        pausarImpresion();
    }
});

document.getElementById('speedSlider').addEventListener('input', actualizarVelocidad);
document.getElementById('btnPlay').addEventListener('click', iniciarImpresion);
