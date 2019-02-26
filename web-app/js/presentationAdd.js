document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;
    const notification = document.querySelector('#notification');
    const root = document.querySelector('table tbody');

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('presentations', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    sync(json.presentation);
                    cleanNotifications();
                    cleanInputs();

                    return;
                }

                logErrors(json.errors);
            });
    }

    function logErrors(errors) {
        const list = errors.errors.map(error => `<li>${error.message}</li>`);

        notification.innerHTML = `<ul>${list}</ul>`;
    }

    function sync(presentation) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const a = document.createElement('a');

        td1.textContent = presentation.name;

        td2.className = 'text-center';
        td2.style.verticalAlign = 'middle';

        a.href = '#';
        a.id = presentation.id
        a.textContent = 'Editar'

        td2.appendChild(a);

        tr.appendChild(td1);
        tr.appendChild(td2);

        root.appendChild(tr);
    }

    function cleanInputs() {
        const elements = [...form.elements];

        elements.forEach(element => element.value = '');

        elements[0].focus();
    }

    function cleanNotifications() {
        notification.innerHTML = '';
    }
});
