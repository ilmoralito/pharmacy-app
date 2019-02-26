document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;
    const root = document.querySelector('table tbody');
    const notification = document.querySelector('#notification');

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
            .filter(element => element.type === 'text' || element.nodeName === 'SELECT' || element.id === 'providerId' || (element.type === 'checkbox' && element.checked))

        return elements;
    }

    function getFormData(elements) {
        const elementList = getElements();
        const formData = new FormData();

        elementList.forEach(element => formData.append(element.name, element.value));

        return formData;
    }

    function logErrors(errors) {
        const list = errors.errors.map(error => `<li>${error.message}</li>`).join('');

        notification.innerHTML = `<ul>${list}</ul>`;
    }

    function sync(medicine) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdGenericName = document.createElement('td');
        const tdLocation = document.createElement('td');
        const tdCode = document.createElement('td');
        const tdEdit = document.createElement('td');
        const anchor = document.createElement('a');
        const editAnchor = document.createElement('a');

        anchor.href = `#`;
        anchor.textContent = medicine.name;
        anchor.setAttribute('data-presentations', JSON.stringify(medicine.presentations));

        editAnchor.href = `edit/${medicine.id}`;
        editAnchor.className = "btn btn-default btn-sm";
        editAnchor.textContent = 'Editar';

        tdName.style.verticalAlign = 'middle';
        tdGenericName.style.verticalAlign = 'middle';
        tdLocation.style.verticalAlign = 'middle';
        tdCode.style.verticalAlign = 'middle';

        tdName.appendChild(anchor);
        tdGenericName.textContent = medicine.genericName;
        tdLocation.textContent = medicine.location;
        tdCode.textContent = medicine.code;
        tdEdit.appendChild(editAnchor);

        tr.appendChild(tdName);
        tr.appendChild(tdGenericName);
        tr.appendChild(tdLocation);
        tr.appendChild(tdCode);
        tr.appendChild(tdEdit);

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

