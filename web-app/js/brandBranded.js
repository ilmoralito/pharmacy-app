document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('branders', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    renderErrors(json.errors.errors);

                    return;
                }

                fetchResource('branders').then(branders => {
                    if (branders.length === 1) {
                        window.location.href = 'branders';

                        return;
                    }

                    cleanInputs(form, 'brand', 'branded');

                    cleanErrors();

                    render(branders);
                });
            })
            .catch(error => console.error(error.message));
    }
});
