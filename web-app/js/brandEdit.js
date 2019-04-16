document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    body.addEventListener('click', handleClick);

    function handleClick(event) {
        const target = event.target;

        if (itsALink(target) && isInsideACell(target)) {
            event.preventDefault();

            const parent = target.closest('tr');
            const currentValue = parent.firstElementChild.textContent;

            if (target.textContent === 'Editar') {
                target.textContent = 'Confirmar';

                const input = createInput(currentValue);

                parent.firstElementChild.innerHTML = input;

                return;
            }

            const newValue = parent.querySelector('input').value;
            const formData = new FormData();

            formData.append('name', newValue);

            fetch(`brands/${target.id}`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    if (json.status === 'ok') {
                        parent.innerHTML = brandToRow(json.brand);

                        target.textContent = 'Editar';

                        return false;
                    }

                    showErrors(json.errors.errors);
                })
                .catch(error => console.error(error.message));
        }
    }

    function showErrors(errors) {
        const messages = errors.map(error => `${error.message}`).join('\n');

        alert(messages);
    }

    function createInput(currentValue) {
        return `<input name="name" id="name" value="${currentValue}" class="form-control">`;
    }

    function itsALink(target) {
        return target.nodeName === 'A';
    }

    function isInsideACell(target) {
        return target.parentNode.nodeName === 'TD';
    }
});
