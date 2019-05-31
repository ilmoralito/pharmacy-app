function makeHelper() {
    const salesDetailRoot = document.querySelector('#salesDetail');
    const currentPaymentType = document.querySelector('#paymentType');

    function updateSalesDetail(dataset) {
        saleDetailList = [...saleDetailList, dataset];

        sync();
    }

    function remove(id) {
        const index = getSaleDetailIndex(id);
        const salesDetailTemp = saleDetailList;

        salesDetailTemp.splice(index, 1);

        saleDetailList = salesDetailTemp;

        const inventoryHelper = makeInventoryHelper();

        inventoryHelper.updateInventoryList();

        saler.setChange();

        sync();
    }

    function sync() {
        if (!saleDetailList.length) {
            salesDetailRoot.innerHTML = '';

            return;
        }

        const rows = saleDetailList.map(saleDetailToRow).join('');

        salesDetailRoot.innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="60%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />

                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>

            <table class="table table-hover table-bordered">
                <col width="80%">
                <col width="20%">

                <tbody>
                    <tr>
                        <td>IVA</td>
                        <td>15%</td>
                    </tr>
                    <tr>
                        <td>SUBTOTAL</td>
                        <td>${calculateSubtotal()}</td>
                    </tr>
                    <tr>
                        <td>TOTAL</td>
                        <td>${calculateTotalSale()}</td>
                    </tr>
                </tbody>
            </table>

            ${currentPaymentType.checked && renderPaymentForm(saler)}

            <button class="btn btn-primary" data-toggle="modal">Pagar</button>`;
    }

    function renderPaymentForm(saler) {
        return `<table class="table table-hover table-bordered">
                <col width="80%">
                <col width="20%">

                <tbody>
                    <tr class="info">
                        <td class="middle-aligned">EFECTIVO RECIBIDO</td>
                        <td>
                            <input
                                type="text"
                                value="${saler.getCashReceived()}"
                                class="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td>VUELTO</td>
                        <td>${saler.getChange()}</td>
                    </tr>
                </tbody>
            </table>`;
    }

    function getSaleDetail(id) {
        return saleDetailList.find(saleDetail => saleDetail.productId === id);
    }

    function validate() {
        for (const saleDetail of saleDetailList) {
            const { quantity, productName } = saleDetail;

            if (isNaN(saleDetail.quantity)) {
                alert(`${productName}, ${quantity} no es una cantidad valida`);

                return false;
            }

            if (saleDetail.quantity > saleDetail.stock) {
                alert(`${productName}, La cantidad supera las existencias`);

                return false;
            }
        }

        return true;
    }

    function update({ id, quantity }) {
        const index = getSaleDetailIndex(id);
        const dataset = getSaleDetail(id);
        const salePrice = dataset.saleprice;
        const total = calculateTotal({
            quantity,
            salePrice
        });
        const newDataset = Object.assign({}, dataset, { quantity }, { total });

        saleDetailList.splice(index, 1, newDataset);

        saler.setChange();

        sync();
    }

    function calculateTotal({ quantity, salePrice }) {
        const result = quantity * salePrice;

        return result.toFixed(2);
    }

    function calculateSubtotal() {
        return saleDetailList.reduce((accumulator, current) => {
            return accumulator + parseInt(current.total, 10);
        }, 0);
    }

    function calculateTotalSale() {
        const subtotal = calculateSubtotal();

        return subtotal + subtotal * 0.15;
    }

    function getSaleDetailIndex(id) {
        return saleDetailList.findIndex(
            saleDetail => saleDetail.productId === id
        );
    }

    function saleDetailToRow(saleDetail) {
        return `<tr>
            <td class="middle-aligned">${saleDetail.productName}</td>
            <td class="middle-aligned">${saleDetail.saleprice}</td>
            <td class="middle-aligned">
                <input
                    id="${saleDetail.productId}"
                    type="number"
                    min="1"
                    max="${saleDetail.stock}"
                    value="${saleDetail.quantity}"
                    class="form-control" />
            </td>
            <td class="middle-aligned">${saleDetail.total}</td>
            <td class="text-center middle-aligned">
                <button id="${saleDetail.productId}" class="btn btn-default">
                    Borrar
                </button>
            </td>
        </tr>`;
    }

    return {
        updateSalesDetail,
        getSaleDetail,
        validate,
        remove,
        update,
        sync
    };
}

function makeInventoryHelper() {
    const inventoryRoot = document.querySelector('#inventory');

    async function fetchInventory() {
        const response = await fetch('/pharmacyApp/inventory/enabled', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        return await response.json();
    }

    async function getCurrentInventoryList() {
        const inventoryList = await fetchInventory();

        return inventoryList.filter(inventory => {
            return !saleDetailList.some(
                saleDetail => saleDetail.productName === inventory.product.name
            );
        });
    }

    function updateInventoryList() {
        getCurrentInventoryList().then(inventoryList => {
            render(inventoryList);
        });
    }

    function render(inventoryList) {
        const rows = inventoryList.map(inventoryToRow).join('');

        inventoryRoot.innerHTML = `
            <table class="table table-hover">
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }

    function inventoryToRow(inventory) {
        return `<tr>
            <td>
                <a
                    href=""
                    data-product-id="${inventory.product.id}"
                    data-product-name="${inventory.product.name}"
                    data-stock="${inventory.stock}"
                    data-salePrice="${inventory.salePrice}"
                    data-quantity="1"
                    data-total="${inventory.salePrice}">
                    ${inventory.product.name}
                </a>
            </td>
        </tr>`;
    }

    return {
        getCurrentInventoryList,
        updateInventoryList,
        fetchInventory,
        render
    };
}
