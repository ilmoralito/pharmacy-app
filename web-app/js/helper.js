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

function createInput({ id, defaultValue }) {
    return `<input name="${id}" name="${id}" value="${defaultValue}" class="form-control" />`;
}

function createSelect({ id, values, defaultValue }) {
    const options = values
        .map(value => {
            const selected = value === defaultValue ? 'selected' : '';

            return `<option value="${value}" ${selected}>${value}</option>`;
        })
        .join('');

    return `<select name="${id}" id="${id}" class="form-control">${options}</select>`;
}

function createSelect2({ id, values, defaultValue }) {
    const options = values
        .map(item => {
            const isSelected = item.text === defaultValue;
            const selected = isSelected ? 'selected' : '';

            return `<option value="${item.value}" ${selected}>${
                item.text
            }</option>`;
        })
        .join('');

    return `<select name="${id}" id="${id}" class="form-control">${options}</select>`;
}

function fetchDatasetFrom(target, excludeFalse = true) {
    const element = document.querySelector(`#${target}`);
    const options = [...element.options];

    if (excludeFalse) {
        return options
            .filter(option => option.value)
            .map(option => ({
                value: option.value,
                text: option.textContent
            }));
    }

    return options.map(option => ({
        value: option.value,
        text: option.textContent
    }));
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
