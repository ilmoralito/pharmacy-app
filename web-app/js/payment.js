document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.paymentForm;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        fetch('/pharmacyApp/payments', {
            method: 'POST',
            body: new FormData(this)
        })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    const messages = getErrorMessages(json.errors.errors);

                    alert(messages);

                    return;
                }

                location.reload(true);
            })
            .catch(error => console.error(error.message));
    }

    function getErrorMessages(errors) {
        return errors.map(error => error.message).join('\n');
    }
});
