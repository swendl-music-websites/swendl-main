
const characters = '0123456789!@#$%^&*()_+[]{}|;:,.<>?';

const animationElement = document.getElementById('random-animation');

function startRandomAnimation() {
function updateText() {
    let randomText = '';
    for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
    }
    animationElement.textContent = randomText;
    setTimeout(updateText, getRandomDelay());
}

updateText();
}

function getRandomDelay() {
return Math.random() * 200 + 50;
}

startRandomAnimation();