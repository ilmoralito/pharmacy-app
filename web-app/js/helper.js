const notification = document.querySelector('#notification');

function renderErrors(errors) {
    const list = errors.map(errorToLiView).join('');

    notification.innerHTML = `<ul>${list}</ul>`;
}

function alertErrors(errors) {
    const list = errors.map(errorToList).join('\n');

    alert(list);
}

function errorToLiView(error) {
    return `<li>${error.message}</li>`;
}

function errorToList(error) {
    return error.message;
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
