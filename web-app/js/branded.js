document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        fetch('branded', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    fetchResource('branded')
                        .then(brandProducts => {
                            if (brandProducts.length === 1) {
                                window.location.href = 'branded';
                            } else {
                                cleanErrors();

                                render(brandProducts);

                                cleanInputs(event.target, 'location');
                            }
                        })
                        .catch(error => console.error(errors.message));

                    return;
                }

                renderErrors(json.errors.errors);
            });
    }
});
