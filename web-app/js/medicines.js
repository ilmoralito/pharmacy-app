document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('medicines', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    renderErrors(json.errors.errors);

                    return;
                }

                fetchResource('medicines').then(medicines => {
                    if (medicines.length === 1) {
                        window.location.href = 'medicines';

                        return;
                    }

                    const helper = makeHelper();

                    helper.render(medicines);

                    cleanInputs(
                        form,
                        'location',
                        'laboratory',
                        'presentation',
                        'measure'
                    );

                    cleanErrors();

                    if (!helper.isFilterPlusContextOpen()) return;

                    helper.sync().then(json => {
                        const [laboratories, genericnames] = json;

                        helper.display({
                            id: 'laboratories',
                            caption: 'Laboratorios',
                            elements: laboratories
                        });

                        helper.display({
                            id: 'genericnames',
                            caption: 'Nombres genericos',
                            elements: genericnames
                        });
                    });
                });
            })
            .catch(error => console.error(error.message));
    }
});
