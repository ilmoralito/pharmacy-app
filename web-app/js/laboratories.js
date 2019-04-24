document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('laboratories', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    renderErrors(json.errors.errors);

                    return;
                }

                fetchResource('laboratories').then(laboratories => {
                    if (laboratories.length === 1) {
                        window.location.href = 'laboratories';

                        return;
                    }

                    cleanErrors();

                    cleanInputs(form);

                    const helper = makeHelper();

                    helper.render(laboratories);
                });
            })
            .catch(error => console.error(error.message));
    }
});
