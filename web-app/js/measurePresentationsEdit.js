document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    table.addEventListener('click', handleEdit);

    function handleEdit(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName === 'A') {
            const parentRow = target.closest('tr');
            const [presentationCell, measureCell, countCell] = parentRow.cells;
            const currentPresentation = presentationCell.textContent;
            const currentMeasure = measureCell.textContent;
            const currentCount = countCell.textContent;

            if (target.textContent === 'Editar') {
                target.textContent = 'Confirmar';

                const presentations = getOptions('presentation', currentPresentation);
                const measures = getOptions('measure', currentMeasure);

                presentationCell.innerHTML = `<select name="presentation" id="presentation" class="form-control">${presentations}</select>`;
                measureCell.innerHTML = `<select name="measure" id="measure" class="form-control">${measures}</select>`;
                countCell.innerHTML = `<input name="count" id="count" value="${currentCount}" class="form-control">`;

                return;
            }

            const newPresentation = presentationCell.querySelector('select').value;
            const newMeasure = measureCell.querySelector('select').value;
            const newCount = countCell.querySelector('input').value;
            
            const formData = new FormData();

            formData.append('presentation', newPresentation);
            formData.append('measure', newMeasure);
            formData.append('count', newCount);
            const options = {
                method: 'POST',
                body: formData
            };

            fetch(`measurePresentations/${target.id}`, options)
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ok') {
                        presentationCell.innerHTML = json.measurePresentation.presentation.name;
                        measureCell.innerHTML = json.measurePresentation.measure.unit;
                        countCell.innerHTML = json.measurePresentation.count;

                        target.textContent = 'Editar';

                        return;
                    }

                    alert(json.errors.errors.map(error => `${error.message}\n`)).join('');
                })
                .catch(error => console.error(error.message));
        }
    }

    function getOptions(target, defaultValue) {
        const source = document.querySelector(`#${target}`);
        const options = [...source.options];
        const result = options.map(option => {
            if (option.textContent === defaultValue) {
                return `<option value="${option.value}" selected>${option.textContent}</option>`;
            }

            return `<option value="${option.value}">${option.textContent}</option>`;
        }).join('');

        return result;
    }
});

