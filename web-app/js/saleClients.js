document.addEventListener('DOMContentLoaded', () => {
    const toggleForm = document.querySelector('#toggleForm');
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    toggleForm.addEventListener('click', toggle);

    function toggle(event) {
        form.classList.toggle('hide');
    }

    function handleSubmit(event) {
        event.preventDefault();

        const dataset = formDataToObject(new FormData(this));

        save(dataset);
    }

    function formDataToObject(formData) {
        return Array.from(formData.entries()).reduce((entry, currentValue) => {
            const [key, value] = currentValue;

            entry[key] = value;

            return entry;
        }, {});
    }

    async function fetchClients() {
        const response = await fetch('/pharmacyApp/clients/enabled', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        return await response.json();
    }

    function render(instance) {
        fetchClients().then(clients => {
            const options = clients
                .map(client => {
                    let selected;

                    if (instance) {
                        selected = client.id === instance.id && 'selected';
                    }

                    return `<option value="${client.id}" ${selected}>
                        ${client.fullName}
                    </option>`;
                })
                .join('');

            document.querySelector('#client').innerHTML = options;
        });
    }

    function save(dataset) {
        fetch('/pharmacyApp/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataset)
        })
            .then(response => response.json())
            .then(json => {
                if (json.status !== 'ok') {
                    const message = getMessages(json.errors.errors);

                    alert(message);

                    return;
                }

                cleanForm();

                closeForm();

                render(json.client);
            })
            .catch(error => console.error(error.message));
    }

    function getMessages(errors) {
        return errors.map(error => error.message).join('\n');
    }

    function cleanForm() {
        Array.from(form.elements).forEach(element => (element.value = ''));
    }

    function closeForm() {
        form.classList.add('hide');
    }

    render();
});
