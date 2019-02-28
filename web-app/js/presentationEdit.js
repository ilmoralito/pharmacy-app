document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    table.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName === 'A' && ['Editar', 'Confirmar'].includes(target.textContent)) {
            const tr = target.closest('tr');
            const cell = tr.children[0];

            if (target.textContent === 'Editar') {
                swapLabel(target);

                const currentValue = cell.textContent;

                cell.innerHTML = `<input class="form-control" value="${currentValue}">`;

                return;
            }

            const newValue = cell.querySelector('input').value;

            fetch(`presentations/${target.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: target.id, name: newValue}),
            })
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ok') {
                        cell.innerHTML = json.presentation.name;

                        swapLabel(target);

                        fetchPresentations();

                        return;
                    }

                    const errors = json.errors.errors.map(error => error.message).join('\n');

                    alert(errors);
                })
                .catch(error => console.error(error.message()));
        }
    }

    function swapLabel(target) {
        target.textContent = target.textContent === 'Editar' ? 'Confirmar' : 'Editar';
    }
});

