document.addEventListener('DOMContentLoaded', () => {
    const toConfirm = document.querySelector('#toConfirm');

    toConfirm.addEventListener('click', handleConfirmOrder);

    function handleConfirmOrder(event) {
        event.preventDefault();

        const helper = makeHelper();

        if (helper.isThereAnUnconfirmedItem()) {
            alert('Todos los artículos deben estar confirmados');

            return;
        }

        const order = helper.getCurrentOrder();

        fetch('/pharmacyApp/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ order: order })
        })
            .then(response => response.json())
            .then(json => {
                if (json.ok) {
                    helper.removeOrder();

                    location.href = '/pharmacyApp/orders';

                    return;
                }

                alert(
                    json.errors.errors
                        .map(error => `${error.message}`)
                        .join('\n')
                );
            });
    }
});
