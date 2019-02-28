const notification = document.querySelector('#notification');
let dataset;

function renderErrors(errors) {
    const list = errors.map(error => `<li>${error.message}</li>`).join('');

    notification.innerHTML = `<ul>${list}</ul>`;
}

function cleanErrors() {
    notification.innerHTML = '';
}

function hasTableElement() {
    return document.querySelector('table');
}

function getFormElements(form) {
    return [...form.elements];
}

function cleanInputs(form, ...excludes) {
    const elements = getFormElements(form);

    for (const element of elements) {
        if (!excludes.includes(element.name)) {
            element.value = '';
        }
    }
}

function fetchResource(source) {
    fetch(source)
        .then(response => response.json())
        .then(json => dataset = json)
        .catch(error => console.error(error.message()));
}
