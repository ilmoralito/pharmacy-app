document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    if (!root) return;

    root.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'A') return;

        const row = target.closest('tr');
        const [
            laboratory,
            name,
            genericName,
            presentation,
            measure,
            quantity,
            location
        ] = [...row.cells];

        if (target.textContent.trim() === 'Editar') {
            target.textContent = 'Confirmar';

            laboratory.innerHTML = createSelect2({
                id: 'laboratory',
                values: fetchDatasetFrom('laboratory', false),
                defaultValue: laboratory.textContent
            });
            name.innerHTML = createInput({
                id: 'name',
                defaultValue: name.textContent
            });
            genericName.innerHTML = createInput({
                id: 'genericName',
                defaultValue: genericName.textContent
            });
            presentation.innerHTML = createSelect2({
                id: 'presentation',
                values: fetchDatasetFrom('presentation'),
                defaultValue: presentation.textContent
            });
            measure.innerHTML = createSelect2({
                id: 'measure',
                values: fetchDatasetFrom('measure'),
                defaultValue: measure.textContent
            });
            quantity.innerHTML = createInput({
                id: 'quantity',
                defaultValue: quantity.textContent
            });
            location.innerHTML = createSelect2({
                id: 'location',
                values: fetchDatasetFrom('location'),
                defaultValue: location.textContent
            });

            return;
        }

        const formData = new FormData();

        formData.append('laboratory', laboratory.querySelector('select').value);
        formData.append('name', name.querySelector('input').value);
        formData.append(
            'genericName',
            genericName.querySelector('input').value
        );
        formData.append(
            'presentation',
            presentation.querySelector('select').value
        );
        formData.append('measure', measure.querySelector('select').value);
        formData.append('quantity', quantity.querySelector('input').value);
        formData.append('location', location.querySelector('select').value);

        fetch(`medicines/${target.id}`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    alertErrors(json.errors.errors);

                    return;
                }

                const medicine = json.medicine;

                laboratory.innerHTML =
                    medicine.laboratory.name && medicine.laboratory.name;
                name.innerHTML = medicine.name;
                genericName.innerHTML =
                    medicine.genericName && medicine.genericName;
                presentation.innerHTML = medicine.presentation.name;
                measure.innerHTML = medicine.measure.abbreviation;
                quantity.innerHTML = medicine.quantity;
                location.innerHTML = medicine.location;

                target.textContent = ' Editar';

                // Update labs and generic names filter
                const helper = makeHelper();

                if (!helper.isFilterPlusContextOpen()) return;

                helper.sync().then(json => {
                    const [laboratories, genericnames] = json;

                    helper.display({
                        id: 'laboratories',
                        caption: 'Laboratorios',
                        elements: laboratories
                    });

                    helper.display({
                        id: 'genericnames',
                        caption: 'Nombres genericos',
                        elements: genericnames
                    });
                });
            })
            .catch(error => console.error(error.message));
    }
});
