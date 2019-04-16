document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    table.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName === 'A') {
            const tr = target.closest('tr');
            const cell0 = tr.children[0];
            const cell1 = tr.children[1];

            if (target.textContent === 'Editar') {
                swapLabel(target);

                const currentUnit = cell0.textContent;
                const currentAbbreviation = cell1.textContent;

                cell0.innerHTML = `<input class="form-control" value="${currentUnit}">`;
                cell1.innerHTML = `<input class="form-control" value="${currentAbbreviation}">`;

                return;
            }

            const newUnit = cell0.querySelector('input').value;
            const newAbbreviation = cell1.querySelector('input').value;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: target.id,
                    unit: newUnit,
                    abbreviation: newAbbreviation
                })
            };

            fetch(`measures/${target.id}`, options)
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ok') {
                        cell0.innerHTML = json.measure.unit;
                        cell1.innerHTML = json.measure.abbreviation;

                        swapLabel(target);

                        return;
                    }

                    alertErrors(json.errors.errors);
                })
                .catch(error => console.error(error.message()));
        }
    }

    function swapLabel(target) {
        target.textContent =
            target.textContent === 'Editar' ? 'Confirmar' : 'Editar';
    }

    function alertErrors(errors) {
        const errorList = errorsToList(errors);

        alert(errorList);
    }

    function errorsToList(errors) {
        return errors.map(error => error.message).join('\n');
    }
});
