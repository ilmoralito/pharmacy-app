document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    table.addEventListener('click', handleEdit);

    function handleEdit(event) {
        const target = event.target;

        if (target.classList.contains('btn')) {
            if (target.textContent === 'Editar') {
                target.textContent = 'Confirmar';

                const cell = target.closest('tr').children[0];
                const value = cell.textContent;

                cell.innerHTML = `<input class="form-control" value="${value}">`;

                return;
            }

            const newValue = target.closest('tr').querySelector('input').value;

            if (!newValue) {
                alert('Campo requerido');

                return;
            }

            const formData = new FormData();

            formData.append('id', target.id);
            formData.append('name', newValue);

            fetch('/pharmacyApp/merchandise/update', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ok') {
                        target.closest('tr').children[0].innerHTML = json.merchandise.name;

                        target.textContent = 'Editar';

                        return;
                    }

                    const message = json.errors.errors.map(error => error.message).join('\n ');

                    alert(message);
                })
                .catch(error => console.error(error.message()));
        }
    }
});
