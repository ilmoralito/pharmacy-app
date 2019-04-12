document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;
    const errorList = document.querySelector('#errors');

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        fetch('clients', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 'ok') {
                    window.location.href = 'clients';

                    return;
                }

                renderErrors(json.errors.errors);
            })
            .catch(error => console.error(error.message));
    }

    function renderErrors(errors) {
        const list = errors.map(error => `<li>${error.message}</li>`).join('');

        errorList.innerHTML = `<ul>${list}</ul>`;
    }
});
