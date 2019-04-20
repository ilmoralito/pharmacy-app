document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    if (!table) return;

    table.addEventListener('change', handleChange);

    function handleChange(event) {
        const target = event.target;

        const formData = new FormData();
        const providerId = target.dataset.providerId;

        formData.append('isChecked', target.checked);
        formData.append('merchandise', target.value);
        formData.append('provider', providerId);

        const options = {
            method: 'POST',
            body: formData
        };

        fetch(`/pharmacyApp/providers/${providerId}/merchandises`, options)
            .then(response => response.json())
            .then(json => {
                if (json.merchandiseSupplier) {
                    console.log(`${json.merchandiseSupplier.id} added`);

                    return;
                }
            })
            .catch(error => console.error(error.message));
    }
});
