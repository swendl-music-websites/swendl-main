
const validCharacters = '0123456789!@#$%^&*()_+[]{}|;:,.<>?';

const animationElement = document.querySelector('#random-animation');

function startRandomAnimation() {
    // Function to update the text content of the animation element
    function updateText() {
        let randomText = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * validCharacters.length);
            randomText += validCharacters[randomIndex];
        }
        animationElement.textContent = randomText;
        setTimeout(updateText, getRandomDelay());
    }

    updateText();
}

function getRandomDelay() {
    // Generate a random delay between 50ms and 250ms
    return Math.random() * 200 + 50;
}

startRandomAnimation();