document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    if (!root) return;

    root.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'A') return;

        const row = target.closest('tr');
        const [name] = [...row.cells];

        if (target.textContent === 'Editar') {
            target.textContent = 'Confirmar';

            name.innerHTML = createInput({
                id: 'name',
                defaultValue: name.textContent
            });

            return;
        }

        const formData = new FormData();

        formData.append('name', name.querySelector('input').value);

        fetch(`branded/${target.id}`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    alertErrors(json.errors.errors);

                    return;
                }

                name.innerHTML = json.branded.name;

                target.textContent = 'Editar';
            })
            .catch(error => console.error(error.message));
    }
});
