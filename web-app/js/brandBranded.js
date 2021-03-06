document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        fetch('branders', { method: 'POST', body: new FormData(this) })
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

                    cleanInputs(form, 'brand', 'branded', 'location');

                    cleanErrors();

                    render(branders);
                });
            })
            .catch(error => console.error(error.message));
    }
});
