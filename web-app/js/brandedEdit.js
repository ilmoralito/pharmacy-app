document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    if (!root) return;

    root.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'A') return;

        const row = target.closest('tr');
        const [name, location] = [...row.cells];

        if (target.textContent === 'Editar') {
            target.textContent = 'Confirmar';

            name.innerHTML = createInput({
                id: 'name',
                defaultValue: name.textContent
            });
            location.innerHTML = createSelect({
                id: 'location',
                values: getLocations(),
                defaultValue: location.textContent
            });

            return;
        }

        const formData = new FormData();

        formData.append('name', name.querySelector('input').value);
        formData.append('location', location.querySelector('select').value);

        fetch(`branded/${target.id}`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    alertErrors(json.errors.errors);

                    return;
                }

                name.innerHTML = json.branded.name;
                location.innerHTML = json.branded.location;

                target.textContent = 'Editar';
            })
            .catch(error => console.error(error.message));
    }

    function getLocations() {
        const location = document.querySelector('#location');

        return [...location.options]
            .filter(option => option.value)
            .map(option => option.value);
    }
});
