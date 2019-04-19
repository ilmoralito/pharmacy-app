document.addEventListener('DOMContentLoaded', () => {
    const form = document.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const options = {
            method: 'POST',
            body: formData
        };

        fetch('merchandises', options)
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    fetchResource('merchandises').then(merchandises => {
                        if (merchandises.length === 1) {
                            window.location.href = 'merchandises';
                        } else {
                            sync(merchandises);

                            cleanInputs(form, 'location');

                            cleanErrors();
                        }
                    });

                    return;
                }

                renderErrors(json.errors.errors);
            })
            .catch(error => console.error(error.message));
    }
});
