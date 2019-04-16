document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const options = {
            method: 'POST',
            body: formData
        };

        fetch('brands', options)
            .then(response => response.json())
            .then(json => {
                fetchResource('brands').then(brands => {
                    if (json.status == 'ok') {
                        if (brands.length === 1) {
                            window.location.href = 'brands';
                        } else {
                            cleanInputs(form);

                            cleanErrors();

                            sync(brands);
                        }

                        return;
                    }

                    renderErrors(json.errors.errors);
                });
            })
            .catch(error => console.error(error.message));
    }

    function sync(brands) {
        const rows = brands.map(brandToRowView).join('');

        document.querySelector('#root').innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="90%">
                <col width="10%">

                <thead>
                    <th>Nombres</th>
                    <th></th>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }

    function brandToRowView(brand) {
        return `<tr>
            <td>${brand.name}</td>
            <td class="text-center" style="vertical-align: middle;">
                <a href="#" id="${brand.id}">Editar</a>
            </td>
        </tr>`;
    }
});
