document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('brands', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (json.status == 'ok') {
                    cleanInputs(form);

                    cleanErrors();

                    sync(json.brand);

                    fetchResource('brands?format=json');

                    return;
                }

                renderErrors(json.errors.errors);
            })
            .catch(error => console.error(error.message));
    }

    function sync(brand) {
        fetch('brands/count')
            .then(response => response.json())
            .then(json => {
                if (json.count == 1) {
                    createTable(brand);

                    return;
                }

                addRow(brand);
            })
            .catch(error => console.error(error.message));
    }

    function createTable(brand) {
        document.querySelector('p').remove();

        const table = document.createElement('table');
        const colName = document.createElement('col');
        const colEdit = document.createElement('col');
        const thead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        const tbody = document.createElement('tbody');
        const thName = document.createElement('th');
        const thEdit = document.createElement('th');
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdEdit = document.createElement('td');
        const a = document.createElement('a');

        table.className = 'table table-hover table-bordered';

        colName.width = '90%';
        colEdit.width = '10%';

        thName.textContent = 'Nombres';

        theadTr.appendChild(thName);
        theadTr.appendChild(thEdit);

        tdName.textContent = brand.name;

        tdEdit.className = 'text-center';
        tdEdit.style.verticalAlign = 'middle';

        a.href = '#';
        a.id = brand.id;
        a.textContent = 'Editar';

        tdEdit.appendChild(a);

        tr.appendChild(tdName);
        tr.appendChild(tdEdit);

        thead.appendChild(theadTr);
        tbody.appendChild(tr);

        table.appendChild(colName);
        table.appendChild(colEdit);
        table.appendChild(thead);
        table.appendChild(tbody);

        document.querySelector('.col-md-10').appendChild(table);
    }

    function addRow(brand) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdEdit = document.createElement('td');
        const a = document.createElement('a');

        tdName.textContent = brand.name;

        tdEdit.className = 'text-center';
        tdEdit.style.verticalAlign = 'middle';

        a.href = '#';
        a.id = brand.id;
        a.textContent = 'Editar';

        tdEdit.appendChild(a);

        tr.appendChild(tdName);
        tr.appendChild(tdEdit);

        document.querySelector('tbody').appendChild(tr);
    }
});
