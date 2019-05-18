document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.cancellationForm;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch(`/pharmacyApp/sales/cancel`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    const messages = getMessages(json.errors.errors);

                    alert(messages);

                    return;
                }

                location.reload(true);
            })
            .catch(error => console.error(error.message));
    }

    function getMessages(errors) {
        return errors.map(error => error.message).join('\n');
    }
});
