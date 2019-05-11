document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    if (!root) return;

    root.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'A') return;

        const row = target.closest('tr');
        const [brand, branded, description, location] = [...row.cells];

        if (target.textContent === 'Editar') {
            target.textContent = 'Confirmar';

            brand.innerHTML = createSelect2({
                id: 'brand',
                values: fetchDatasetFrom('brand'),
                defaultValue: brand.textContent
            });
            branded.innerHTML = createSelect2({
                id: 'branded',
                values: fetchDatasetFrom('branded'),
                defaultValue: branded.textContent
            });
            description.innerHTML = createInput({
                id: 'description',
                defaultValue: description.textContent
            });
            location.innerHTML = createSelect2({
                id: 'location',
                values: fetchDatasetFrom('location'),
                defaultValue: location.textContent
            });

            return;
        }

        const formData = new FormData();

        const newBrand = brand.querySelector('select').value;
        const newBranded = branded.querySelector('select').value;
        const newDescription = description.querySelector('input').value;
        const newLocation = location.querySelector('select').value;

        formData.append('brand', newBrand);
        formData.append('branded', newBranded);
        formData.append('description', newDescription);
        formData.append('location', newLocation);

        fetch(`branders/${target.id}`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    alertErrors(json.errors.errors);

                    return;
                }

                brand.innerHTML = json.brandBranded.brand.name;
                branded.innerHTML = json.brandBranded.branded.name;
                description.innerHTML = json.brandBranded.description;
                location.innerHTML = json.brandBranded.location;

                target.textContent = 'Editar';
            })
            .catch(error => console.error(error.message));
    }
});
