const notification = document.querySelector('#notification');

function renderErrors(errors) {
    const list = errors.map(error => `<li>${error.message}</li>`).join('');

    notification.innerHTML = `<ul>${list}</ul>`;
}

function cleanErrors() {
    notification.innerHTML = '';
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

async function fetchResource(source) {
    const options = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const response = await fetch(source, options);

    return response.json();
}
