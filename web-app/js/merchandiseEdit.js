document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    if (!root) {
        return false;
    }

    root.addEventListener('click', handleEdit);

    function handleEdit(event) {
        const target = event.target;

        if (target.nodeName === 'A') {
            event.preventDefault();

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

            const newName = name.querySelector('input').value;
            const newLocation = location.querySelector('select').value;

            const formData = new FormData();

            formData.append('name', newName);
            formData.append('location', newLocation);

            fetch(`merchandises/${target.id}`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    if (json.ok) {
                        const merchandise = json.merchandise;

                        name.innerHTML = merchandise.name;
                        location.innerHTML = merchandise.location;

                        target.textContent = 'Editar';

                        return;
                    }

                    alertErrors(json.errors.errors);

                    alert(message);
                })
                .catch(error => console.error(error.message));
        }
    }

    function getLocations() {
        const location = document.querySelector('#location');

        return [...location.options]
            .filter(option => option.value)
            .map(option => option.value);
    }
});
