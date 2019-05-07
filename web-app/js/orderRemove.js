document.addEventListener('DOMContentLoaded', () => {
    const remove = document.querySelector('#remove');

    remove.addEventListener('click', handleRemoveOrder);

    function handleRemoveOrder(event) {
        event.preventDefault();

        if (!confirm('¿Seguro de continuar?')) return;

        const helper = makeHelper();

        helper.removeOrder();

        location.href = '/pharmacyApp/orders';
    }
});
