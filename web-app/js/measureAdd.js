document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;
    const root = document.querySelector('table tbody');

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('measures', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    sync(json.measure);
                    cleanNotifications();
                    cleanInputs(form);

                    return;
                }

                logErrors(json.errors);
            });
    }

    function sync(measure) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const a = document.createElement('a');

        td1.textContent = measure.unit;
        td2.textContent = measure.abbreviation

        td3.className = 'text-center';
        td3.style.verticalAlign = 'middle';

        a.href = '#';
        a.id = measure.id
        a.textContent = 'Editar'

        td3.appendChild(a);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        root.appendChild(tr);
    }
});
