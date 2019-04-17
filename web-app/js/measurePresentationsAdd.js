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

        fetch('measurePresentations', options)
            .then(response => response.json())
            .then(json => {
                fetchResource('measurePresentations').then(
                    measurePresentations => {
                        if (json.status === 'ok') {
                            if (measurePresentations.length === 1) {
                                window.location.href = 'measurePresentations';
                            } else {
                                sync(measurePresentations);

                                cleanInputs(form, 'presentation', 'measure');

                                cleanErrors();
                            }

                            return;
                        }

                        renderErrors(json.errors.errors);
                    }
                );
            })
            .catch(error => console.error(error.message()));
    }

    function sync(measurePresentations) {
        const rows = measurePresentations
            .map(measurePresentationToRowView)
            .join('');

        document.querySelector('#root').innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="70%">
                <col width="10%">
                <col width="10% ">
                <col width="10%">

                <thead>
                    <th>Presentacion</th>
                    <th>Medida</th>
                    <th>Cantidad</th>
                    <th></th>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        `;
    }
});
