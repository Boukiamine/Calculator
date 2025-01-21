let display = document.getElementById('display');
let buttons = document.querySelectorAll('.button');
let isError = false;

// Désactiver les boutons
function disableButtons() {
    buttons.forEach(button => button.disabled = true);
}

// Réactiver les boutons
function enableButtons() {
    buttons.forEach(button => button.disabled = false);
}

// Gérer une erreur
function handleError() {
    if (!isError) return;

    disableButtons();

    setTimeout(() => {
        isError = false;
        display.textContent = '';
        enableButtons();
    }, 2000);
}

// Calculer une expression
function calculate(input) {
    try {
        display.textContent = eval(input.replace('x', '*').replace('÷', '/'));
    } catch {
        display.textContent = 'Error';
        isError = true;
        handleError();
    }
}

// Ajouter un chiffre ou un opérateur
function appendValue(value) {
    if (isError) return;
    display.textContent += value;
}

// Effacer l'affichage
function clearDisplay() {
    if (isError) return;
    display.textContent = '';
}

// Ouvrir le menu de donation
function toggleDonation() {
    const menu = document.getElementById('donation-menu');
    menu.style.display = menu.style.display === 'none' || !menu.style.display ? 'block' : 'none';
}

// Ouvrir PayPal
function openPaypal(amount) {
    window.open(`https://www.paypal.com/donate?business=boukinoob@gmail.com&amount=${amount}`, '_blank');
}

// Événements
buttons.forEach(button => {
    button.addEventListener('click', event => {
        const value = event.target.textContent;

        if (value === 'AC') {
            clearDisplay();
        } else if (value === '=') {
            calculate(display.textContent);
        } else {
            appendValue(value);
        }
    });
});
