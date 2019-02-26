document.addEventListener('DOMContentLoaded', () => {
    const form = document.form;
    const notification = document.querySelector('#notification');

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const endpoint = '/pharmacyApp/merchandise/save';
        const formData = new FormData(form);
        const init = {
            method: 'POST',
            body: formData
        };

        fetch(endpoint, init)
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    clean();
                    sync(json.merchandise);

                    notification.innerHTML = '';

                    return;
                }

                logErrors(json.errors)
            })
            .catch(error => console.error(error.message()));
    }

    function sync(merchandise) {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const editTd = document.createElement('td');
        const anchor = document.createElement('a');

        nameTd.style.verticalAlign = 'middle';
        nameTd.textContent = merchandise.name

        anchor.href = '#';
        anchor.id = merchandise.id;
        anchor.textContent = 'Editar';
        anchor.className = 'btn btn-default btn-sm';

        editTd.className = 'text-center';
        editTd.appendChild(anchor);

        tr.appendChild(nameTd);
        tr.appendChild(editTd);

        document.querySelector('table tbody').appendChild(tr);
    }

    function logErrors(errors) {
        const list = errors.errors.map(errorToView).join('');

        notification.innerHTML = `<ul>${list}</ul>`;
    }

    function errorToView(error) {
        return `<li>${error.message}</li>`;
    }

    function clean() {
        const elements = [...form.elements].filter(element => element.nodeName !== 'BUTTON' && element.type !== 'hidden');

        elements.forEach(element => element.value = '');

        elements[0].focus()
    }
});
