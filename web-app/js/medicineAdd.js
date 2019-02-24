document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;
    const root = document.querySelector('table tbody');

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = getFormData();
        const endpoint = '/pharmacyApp/medicine/save';
        const init = {
            method: 'POST',
            body: formData
        };

        fetch(endpoint, init)
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    sync(json.medicine);
                    clean();

                    return;
                }

                logErrors(json.errors);
            });
    }

    function getElements() {
        const elements = [...form.elements]
            .filter(element => element.type === 'text' || element.nodeName === 'SELECT' || element.id === 'id' || (element.type === 'checkbox' && element.checked))

        return elements;
    }

    function getFormData(elements) {
        const elementList = getElements();
        const formData = new FormData();

        elementList.forEach(element => formData.append(element.name, element.value));

        return formData;
    }

    function logErrors(errros) {

    }

    function sync(medicine) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdGenericName = document.createElement('td');
        const tdLocation = document.createElement('td');
        const tdCode = document.createElement('td');
        const anchor = document.createElement('a');

        anchor.href = `show/${medicine.id}`;
        anchor.textContent = medicine.name;

        tdName.appendChild(anchor);
        tdGenericName.textContent = medicine.genericName;
        tdLocation.textContent = medicine.location;
        tdCode.textContent = medicine.code;

        tr.appendChild(tdName);
        tr.appendChild(tdGenericName);
        tr.appendChild(tdLocation);
        tr.appendChild(tdCode);

        root.appendChild(tr);
    }

    function clean() {
        const elements = getElements();

        elements.forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = false;
                element.closest('details').open = false;
            }

            element.value = '';
        });
    }
});

