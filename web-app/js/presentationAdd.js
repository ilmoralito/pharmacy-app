document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('presentations', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                fetchResource('presentations').then(presentations => {
                    if (json.status === 'ok') {
                        if (presentations.length === 1) {
                            window.location.href = 'presentations';
                        } else {
                            sync(presentations);

                            cleanErrors();

                            cleanInputs(form);
                        }

                        return;
                    }

                    renderErrors(json.errors.errors);
                });
            });
    }

    function sync(presentations) {
        const rows = presentations.map(presentationToRowView).join('');

        document.querySelector('#root').innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="80%">
                <col width="10%">
                <col width="10%">

                <thead>
                    <th>Nombres</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }
});
