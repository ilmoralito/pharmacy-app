const notification = document.querySelector('#notification');
let measures;

function cleanInputs(form) {
    const elements = [...form.elements];

    elements.forEach(element => element.value = '');

    elements[0].focus();
}

function cleanNotifications() {
    notification.innerHTML = '';
}

function swapLabel(target) {
    target.textContent = target.textContent === 'Editar' ? 'Confirmar' : 'Editar';
}

function logErrors(errors) {
    const list = errors.errors.map(error => `<li>${error.message}</li>`).join('');

    notification.innerHTML = `<ul>${list}</ul>`;
}

function fetchMeasures() {
    fetch('measures?format=json')
        .then(response => response.json())
        .then(json => measures = json)
        .catch(error => console.error(error.message()));
}