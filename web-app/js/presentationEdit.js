document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    body.addEventListener('click', handleClick);

    function handleClick(event) {
        const target = event.target;

        if (itsALink(target) && itsEditLink(target)) {
            event.preventDefault();

            const tr = target.closest('tr');
            const cell = tr.children[0];

            if (target.textContent === 'Editar') {
                swapLabel(target);

                const currentValue = cell.textContent;

                cell.innerHTML = `<input class="form-control" value="${currentValue}">`;

                return;
            }

            const newValue = cell.querySelector('input').value;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: target.id, name: newValue })
            };

            fetch(`presentations/${target.id}`, options)
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ok') {
                        cell.innerHTML = json.presentation.name;

                        swapLabel(target);

                        return;
                    }

                    const errors = json.errors.errors
                        .map(error => error.message)
                        .join('\n');

                    alert(errors);
                })
                .catch(error => console.error(error.message));
        }
    }

    function swapLabel(target) {
        target.textContent =
            target.textContent === 'Editar' ? 'Confirmar' : 'Editar';
    }

    function itsALink(target) {
        return target.nodeName === 'A';
    }

    function itsEditLink(target) {
        return ['Editar', 'Confirmar'].includes(target.textContent);
    }
});
