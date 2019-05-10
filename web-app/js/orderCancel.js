document.addEventListener('DOMContentLoaded', () => {
    const cancel = document.querySelector('#cancel');

    if (!cancel) return;

    cancel.addEventListener('click', handleClick);

    function handleClick(event) {
        fetch(`/pharmacyApp/orders/${event.target.dataset.orderId}/cancel`)
            .then(response => response.json())
            .then(json => console.log('Orden cancelada'))
            .catch(error => console.error(error.message));
    }
});
