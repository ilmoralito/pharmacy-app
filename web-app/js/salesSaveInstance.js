document.addEventListener('DOMContentLoaded', () => {
    const confirm = document.querySelector('.modal-footer button');

    confirm.addEventListener('click', handleClick);

    function handleClick(event) {
        const client = getClient();
        const paymentType = getPaymentType();

        saler.setClient(client);
        saler.setPaymentType(paymentType);

        fetch('/pharmacyApp/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                sale: saler.getSale(),
                salesDetail: saleDetailList
            })
        })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    const messages = getErrorMessages(json.errors.errors);

                    alert(messages);

                    return;
                }

                location.href = '/pharmacyApp/sale';
            })
            .catch(error => console.error(error.message));
    }

    function getClient() {
        return document.querySelector('#client').value;
    }

    function getPaymentType() {
        return document.querySelector('#paymentType').value;
    }

    function getErrorMessages(errors) {
        return errors.map(error => error.message).join('\n');
    }
});
