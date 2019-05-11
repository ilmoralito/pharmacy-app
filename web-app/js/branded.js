document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        fetch('branded', {
            method: 'POST',
            body: new FormData(event.target)
        })
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    fetchResource('branded')
                        .then(brandProducts => {
                            if (brandProducts.length === 1) {
                                window.location.href = 'branded';

                                return;
                            }

                            const helper = makeHelper();

                            helper.render(brandProducts);

                            cleanErrors();
                            cleanInputs(event.target);
                        })
                        .catch(error => console.error(error.message));

                    return;
                }

                renderErrors(json.errors.errors);
            })
            .catch(error => console.error(error.message));
    }
});
