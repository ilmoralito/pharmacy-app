document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const endpoint = '/pharmacyApp/provider/save';
        const init = { method: 'POST', body: formData };

        fetch(endpoint, init)
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    debugger
                    sync(json.provider);
                    clean();

                    return;
                }

                logErrors(json.errors);
            })
            .catch(error => console.error(error.message()));
    }

    function sync(provider) {
        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const addressTd = document.createElement('td');
        const phoneTd = document.createElement('td');
        const statusTd = document.createElement('td');
        const productsTd = document.createElement('td');
        const anchor = document.createElement('a');
        const productsAnchor = document.createElement('a');

        anchor.href = `show/${provider.id}`;
        anchor.text = provider.name;

        productsAnchor.href = '#';
        productsAnchor.textContent = '* Productos';

        nameTd.appendChild(anchor);
        addressTd.textContent = provider.address;
        phoneTd.textContent = provider.phone;
        statusTd.textContent = provider.status ? 'Activo' : 'No activo'
        productsTd.appendChild(productsAnchor);

        tr.appendChild(nameTd);
        tr.appendChild(addressTd);
        tr.appendChild(phoneTd);
        tr.appendChild(statusTd);
        tr.appendChild(productsTd);

        document.querySelector('table tbody').appendChild(tr);
    }

    function clean() {
        const filtered = [...form.elements].filter(element => element.nodeName !== 'BUTTON');

        filtered.forEach(element => element.value = '');
    }

    function logErrors(errors) {
        const list = errors.errors.map(error => `<li>${error.message}</li>`).join('');

        document.querySelector('#notification').innerHTML = `<ul>${list}</li>`;
    }
});
