document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');

    if (!root) return;

    root.addEventListener('change', handleChange);

    function handleChange(event) {
        const target = event.target;

        if (target.nodeName !== 'INPUT') return;

        const formData = new FormData();
        const providerId = target.dataset.providerId;

        formData.append('provider', providerId);
        formData.append('brandBranded', target.value);
        formData.append('isChecked', target.checked);

        fetch(`/pharmacyApp/providers/${providerId}/branders`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(json => {})
            .catch(error => console.error(error.message));
    }
});
