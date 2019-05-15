let saleDetailList = [];

function makeSale() {
    let cashReceived = 0;
    let paymentType;
    let change = 0;
    let client;

    function setCashReceived(amount) {
        cashReceived = amount;
    }

    function getCashReceived() {
        return cashReceived;
    }

    function setPaymentType(payment) {
        paymentType = payment;
    }

    function setChange() {
        const totalSale = calculateTotalSale();

        change = cashReceived - totalSale;
    }

    function getChange() {
        return change.toFixed(2);
    }

    function setClient(customer) {
        client = customer;
    }

    function getSale() {
        return {
            cashReceived,
            paymentType,
            change,
            client
        };
    }

    function validate() {
        if (change < 0 || isNaN(change)) {
            alert('El vuelto es invalido');

            return false;
        }

        if (isNaN(cashReceived)) {
            alert('El dinero recibido es invalido');

            return false;
        }

        const totalSale = calculateTotalSale();

        if (cashReceived < totalSale) {
            alert(
                'El dinero recibido debe ser mayor o igual que el total a pagar'
            );

            return false;
        }

        return true;
    }

    function calculateTotalSale() {
        const subtotal = calculateSubtotal();

        return 0.15 * subtotal + subtotal;
    }

    function calculateSubtotal() {
        return saleDetailList
            .map(saleDetail => Number.parseFloat(saleDetail.total))
            .reduce((accumulator, currentValue) => {
                accumulator += currentValue;

                return accumulator;
            }, 0);
    }

    return {
        getCashReceived,
        setCashReceived,
        setPaymentType,
        setChange,
        getChange,
        setClient,
        getSale,
        validate
    };
}

const saler = makeSale();
