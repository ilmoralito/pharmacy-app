document.addEventListener('DOMContentLoaded', () => {
    const toConfirm = document.querySelector('#toConfirm');

    toConfirm.addEventListener('click', handleConfirmOrder);

    // TODO
    function handleConfirmOrder(event) {
        event.preventDefault();
    }
});
