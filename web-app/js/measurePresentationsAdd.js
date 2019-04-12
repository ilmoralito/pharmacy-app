document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('measurePresentations', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    sync(json.measurePresentation);

                    cleanErrors();

                    cleanInputs(form, 'presentation', 'measure');

                    fetchResource('measurePresentations?format=json')

                    return;
                }

                const domPresentation = form.querySelector('#form');
                const currentPresentation = domPresentation.options(domPresentation.selectedIndex).text;

                console.log(currentPresentation);

                // TODO: Highlight row with repeated data
                // if (json.errors.errors.find(error => error.message === 'Intentas agregar un dato que ya existe')) {
                //     const tbody = document.querySelector('tbody');
                //     const rows = [...tbody.rows];

                //     for (const row of rows) {
                //         const [presentationCell, measureCell, countCell] = row.cells;



                //         if (
                //             presentationCell.textContent === form.querySelector('#presentation').textContent &&
                //             measureCell.textContent === form.querySelector('#measure').textContent &&
                //             countCell.textContent === form.querySelector('#count').value
                //         ) {
                //             row.style.background = 'red';

                //             break;
                //         }
                //     }
                // }

                renderErrors(json.errors.errors);
            })
            .catch(error => console.error(error.message()));
    }

    function sync(dataset) {
        if (!hasTableElement()) {
            createTable(dataset);

            return;
        }

        addRowToTable(dataset);
    }

    function createTable(dataset) {
        document.querySelector('p').innerHTML = `<table class="table table-hover table-bordered">
            <col width="45%">
            <col width="45%">
            <col width="10%">

            <thead>
                <tr>
                    <th>Presentacion</th>
                    <th>Medida</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>${dataset.presentation.name}</td>
                    <td>${dataset.measure.unit}</td>
                    <td>${dataset.count}</td>
                    <td class="text-center" style="vertical-align: middle;">
                        <a href="#" id="${dataset.id}">Editar</a>
                    </td>
                </tr>
            </tbody>
        </table>`;
    }
});
