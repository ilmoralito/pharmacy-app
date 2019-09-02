document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('.modal-footer button');

    trigger.addEventListener('click', handleClick);

    function handleClick(event) {
        const providerId = document.querySelector('.modal-body select#provider').value;
        const paymentType = document.querySelector('.modal-body select#paymentType').value;

        if (!providerId) {
            alert('Selecciona un proveedor para continuar');

            return false;
        }

        if (!paymentType) {
            alert('Selecciona un tipo de pago para continuar');

            return false;
        }

        location.replace(`/pharmacyApp/orders/create/${providerId}/type/${paymentType}`);
    }
});
