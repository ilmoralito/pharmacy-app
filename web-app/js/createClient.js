document.addEventListener('DOMContentLoaded', () => {
    const createClient = document.querySelector('#createClient');
    const confirm = document.querySelector('#confirm');

    createClient.addEventListener('click', toggle);

    confirm.addEventListener('click', handleConfirm);

    document.addEventListener('keyup', closeToddler);

    function handleConfirm(event) {
        event.preventDefault();

        const formData = new FormData(document.form);
        const init = { method: 'POST', body: formData };

        fetch('/pharmacyApp/client/save', init)
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    sync(json.client);

                    return;
                }

                const errors = json.errors.errors.map(errorToLiView).join('');

                document.querySelector('#notification').innerHTML = `<ul>${errors}</ul>`;
            })
            .catch(error => console.error(error.message()));
    }

    function errorToLiView(error) {
        return `<li>${error.message}</li>`;
    }

    function sync(client) {
        const tr = document.createElement('tr');
        const fullNameTd = document.createElement('td');
        const addressTd = document.createElement('td');
        const identificationCardTd = document.createElement('td');
        const phonesTd = document.createElement('td');
        const statusTd = document.createElement('td');
        const a = document.createElement('a');

        a.href = `show/${client.id}`;
        a.textContent = client.fullName;

        fullNameTd.appendChild(a);
        addressTd.textContent = client.address;
        identificationCardTd.textContent = client.identificationCard;
        phonesTd.textContent = client.phones;
        statusTd.textContent = 'Habilitado';

        tr.appendChild(fullNameTd);
        tr.appendChild(addressTd);
        tr.appendChild(identificationCardTd);
        tr.appendChild(phonesTd);
        tr.appendChild(statusTd);

        document.querySelector('table tbody').appendChild(tr);

        clean();
    }

    function clean() {
        const elements = [...document.form.elements].filter(element => element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA');

        elements.forEach(element => element.value = '');

        elements[0].focus();
    }

    function toggle() {
        const toddler = document.querySelector('.toddler');

        toddler.style.left = toddler.style.left === '0px' ? '-400px' : '0px';
    }

    function closeToddler(event) {
        if (event.key === 'Escape') {
            toggle();
        }
    }
});
