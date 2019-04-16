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

        fetch('measures', options)
            .then(response => response.json())
            .then(json => {
                fetchResource('measures').then(measures => {
                    if (json.status === 'ok') {
                        if (measures.length === 1) {
                            window.location.href = 'measures';
                        } else {
                            sync(measures);

                            cleanInputs(form);

                            cleanErrors();
                        }

                        return;
                    }

                    renderErrors(json.errors.errors);
                });
            })
            .catch(error => console.error(error.message));
    }

    function sync(measures) {
        const rows = measures.map(measureToRowView).join('');

        document.querySelector('#root').innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="20%">
                <col width="70%">
                <col width="10%">

                <thead>
                    <th>Unidad</th>
                    <th>Abreviación</th>
                    <th></th>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }
});
