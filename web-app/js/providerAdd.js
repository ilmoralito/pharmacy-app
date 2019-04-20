document.addEventListener('DOMContentLoaded', () => {
    const notification = document.querySelector('#notification');
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const options = {
            method: 'POST',
            body: formData
        };

        fetch('providers', options)
            .then(response => response.json())
            .then(json => {
                fetchProviders().then(providers => {
                    if (json.status === 'ok') {
                        if (providers.length === 1) {
                            window.location.href = 'providers';
                        } else {
                            sync(providers);

                            cleanInputs();

                            cleanErrors();
                        }

                        return;
                    }

                    logErrors(json.errors);
                });
            })
            .catch(error => console.error(error.message));
    }

    function sync(providers) {
        const rows = providers
            .map(provider => {
                return `<tr>
                <td>
                    <a href="providers/${provider.id}/show">${provider.name}</a>
                </td>
                <td>${provider.address}</td>
                <td>${provider.phone}</td>
                <td>${provider.status}</td>
                <td>
                    <a href="providers/${
                        provider.id
                    }/merchandises">Productos</a>
                </td>
            </tr>`;
            })
            .join('');

        document.querySelector('#root').innerHTML = `
            <table class="table table-bordered table-hover">
                <col width="20%" />
                <col width="57%" />
                <col width="8%" />
                <col width="7%" />
                <col width="9%" />

                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Telefono</th>
                        <th>Estado</th>
                        <th>Productos</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }

    function cleanInputs() {
        [...form.elements]
            .filter(element => element.nodeName !== 'BUTTON')
            .forEach(element => (element.value = ''));
    }

    function cleanErrors() {
        notification.innerHTML = '';
    }

    function logErrors(errors) {
        const list = errors.errors
            .map(error => `<li>${error.message}</li>`)
            .join('');

        notification.innerHTML = `<ul>${list}</li>`;
    }
});
