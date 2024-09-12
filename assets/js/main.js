window.addEventListener('load', function () {
    const carga = document.getElementById('carga');
    setTimeout(() => {
        carga.classList.add('oculto');
    }, 4000); // Espera 4 segundos antes de iniciar el desvanecimiento
});

// Lista de imágenes en la carpeta ./assets/img/
const images = [
    'assets/img/fiestas1.jpg',
    'assets/img/fiestas2.jpg',
    'assets/img/fiestas3.jpg',
    'assets/img/fiestas4.jpg',
    'assets/img/fiestas5.jpg',
    'assets/img/fiestas6.jpg',
    'assets/img/fiestas7.jpg',
    'assets/img/fiestas8.jpg',
    'assets/img/fiestas9.jpg',
    'assets/img/fiestas10.jpeg'
];

let currentImageIndex = 0;

function changeBackgroundImage() {
    const backgroundContainer = document.querySelector('#background-container');

    // Primero asegura que el contenedor del fondo sea visible
    backgroundContainer.style.opacity = 0;
    backgroundContainer.style.backgroundImage = `url(${images[currentImageIndex]})`;

    // Luego realiza la transición de opacidad para hacer la imagen visible
    setTimeout(() => {
        backgroundContainer.style.opacity = 1;
    }, 50); // Breve retraso para que la transición sea visible

    currentImageIndex = (currentImageIndex + 1) % images.length;
}

// Cambiar imagen cada 10 segundos
setInterval(changeBackgroundImage, 10000);

// Inicializar la primera imagen
changeBackgroundImage();

let pallas = [];
let lastPallaId = null; // Variable para almacenar el ID de la última palla mostrada

async function loadPallas() {
    try {
        const response = await fetch('pallas.txt');
        pallas = await response.json();
        displayPalla(pallas[0]); // Mostrar la primera palla al inicio
    } catch (error) {
        console.error('Error al cargar el archivo pallas.txt:', error);
    }
}

function displayPalla(palla) {
    const pallasContainer = document.getElementById('pallas');

    // Crear HTML para mostrar las estrofas y párrafos
    let estrofasHTML = palla.estrofas.map(estrofa => {
        let parrafosHTML = estrofa.parrafos.map(parrafo => `<p>${parrafo}</p>`).join('');
        return `<div class="estrofa">${parrafosHTML}</div>`;
    }).join('');

    pallasContainer.innerHTML = `
        <h2>${palla.titulo}</h2>
        ${estrofasHTML}
    `;
    lastPallaId = palla.id; // Actualiza el ID de la última palla mostrada
}

function showRandomPalla() {
    if (pallas.length > 0) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * pallas.length);
        } while (pallas[randomIndex].id === lastPallaId);

        displayPalla(pallas[randomIndex]);
    }
}

document.getElementById('siguientePalla').addEventListener('click', showRandomPalla);

loadPallas();

// Referencia al elemento de audio
const audio = document.getElementById('miSonido');
const playButton = document.getElementById('play');
let isPlaying = true; // Inicialmente está en reproducción

// Actualiza el ícono del botón según el estado del audio
function updateButtonIcon() {
    const playButtonIcon = playButton.querySelector('i');
    if (isPlaying) {
        playButtonIcon.classList.remove('bx-play');
        playButtonIcon.classList.add('bx-pause');
    } else {
        playButtonIcon.classList.remove('bx-pause');
        playButtonIcon.classList.add('bx-play');
    }
}

// Controlar la reproducción y pausa del audio
playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play().catch((error) => {
            console.error('Error al reproducir el audio:', error);
        });
    }
    isPlaying = !isPlaying;
    updateButtonIcon();
});

// Actualizar el ícono al cargar la página
updateButtonIcon();
