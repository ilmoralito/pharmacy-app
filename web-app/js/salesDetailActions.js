document.addEventListener('DOMContentLoaded', () => {
    const salesDetail = document.querySelector('#salesDetail');

    salesDetail.addEventListener('click', handleClick);
    salesDetail.addEventListener('change', handleInput);

    function handleClick(event) {
        const target = event.target;

        if (target.nodeName !== 'BUTTON') return;

        const helper = makeHelper();

        if (target.textContent.trim() === 'Borrar') {
            helper.remove(target.id);

            return;
        }

        // Pay
        if (!helper.validate() || !saler.validate()) return;

        $('#myModal').modal();
    }

    function handleInput(event) {
        const target = event.target;
        const helper = makeHelper();

        // quantity
        if (target.type === 'number') {
            const id = target.id;
            const quantity = parseInt(target.value, 10);

            helper.update({ id, quantity });

            return;
        }

        const cashReceived = parseFloat(target.value);

        saler.setCashReceived(cashReceived);
        saler.setChange();

        helper.sync();
    }
});
