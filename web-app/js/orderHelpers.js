function makeHelper() {
    const productsContainer = document.querySelector('#products');
    const itemsContainer = document.querySelector('#items');

    function isValid(order) {
        for (const key in order) {
            if (!order[key]) {
                return {
                    ok: false,
                    key: translate(key),
                    message: 'requerido'
                };
            }
        }

        return { ok: true };
    }

    function formDataToObject(formData) {
        return [...formData.entries()].reduce((entry, current) => {
            const [key, value] = current;

            if (isItHidden(key)) return entry;

            entry[key] = value;

            return entry;
        }, {});
    }

    function getCurrentOrder() {
        return JSON.parse(localStorage.getItem('order'));
    }

    function sync(order) {
        localStorage.setItem('order', JSON.stringify(order));
    }

    function removeItem(id) {
        const order = getCurrentOrder();
        const items = order.items;
        const index = items.findIndex(item => item.id === id);

        const item = items.splice(index, 1);

        if (!items.length) {
            delete order.items;
        } else {
            order.items = items;
        }

        sync(order);
    }

    function getItem(id) {
        const order = getCurrentOrder();

        return order.items.find(item => item.id === id);
    }

    function addItem(item) {
        const order = getCurrentOrder();

        if (!order.hasOwnProperty('items')) {
            order.items = [item];
        } else {
            const items = [...order.items, item];

            order.items = items;
        }

        sync(order);

        render(order.items);
    }

    function render(items) {
        const rows = items.map(itemToRow).join('');

        itemsContainer.innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="40%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />

                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio compra</th>
                        <th>Precio venta</th>
                        <th>Saldo</th>
                        <th colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }

    function removeOrder() {
        localStorage.removeItem('order');
    }

    function setProducts() {
        const order = getCurrentOrder();

        getProviderProducts(order.provider).then(products => {
            if (!order.hasOwnProperty('items')) {
                renderProducts(products);

                return;
            }

            const results = excludeSelectedProducts({
                items: order.items,
                products
            });

            renderProducts(results);
        });
    }

    function setItems() {
        const order = getCurrentOrder();

        if (!order.hasOwnProperty('items')) return;

        render(order.items);
    }

    function createDefaultItem({ id, product }) {
        return {
            id,
            product,
            quantity: 0,
            purchasePrice: 0.0,
            salePrice: 0.0,
            balanceToPay: 0.0,
            confirmed: false
        };
    }

    async function getProviderProducts(provider) {
        const response = await fetch(`/pharmacyApp/orders/${provider}/create`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        return await response.json();
    }

    function filter(criteria) {
        const order = getCurrentOrder();

        getProviderProducts(order.provider).then(products => {
            const productList = excludeSelectedProducts({
                items: order.items,
                products
            });

            const results = productList.filter(product =>
                product.name.toLowerCase().includes(criteria)
            );

            renderProducts(results);
        });
    }

    function isThereAnUnconfirmedItem() {
        const order = getCurrentOrder();

        if (!order.hasOwnProperty('items')) return true;

        return order.items.some(item => !item.confirmed);
    }

    function setForm(form) {
        const order = getCurrentOrder();

        for (const key in order) {
            if (!form[key]) continue;

            form[key].value = order[key];
        }
    }

    function updateOrder(order) {
        const items = getCurrentOrderItems();

        if (items) {
            order.items = items;
        }

        sync(order);
    }

    function getCurrentOrderItems() {
        const order = getCurrentOrder();

        return order.items;
    }

    function isItHidden(key) {
        const node = document.querySelector(`#${key}`);

        if (!node) return false;

        return node.closest('.form-group').classList.contains('hide');
    }

    function excludeSelectedProducts({ items, products }) {
        const itemList = items.map(item => item.product);

        return products.filter(product => !itemList.includes(product.name));
    }

    function renderProducts(products) {
        const rows = products.map(productToRowView).join('');

        productsContainer.innerHTML = `
            <table class="table table-hover table-bordered">
                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }

    function productToRowView(product) {
        return `<tr>
            <td>
                <a href="" id="${product.id}">${getProductName(product)}</a>
            </td>
        </tr>`;
    }

    function itemToRow(item) {
        return `<tr>
            <td class="middle-aligned">${item.product}</td>
            <td class="middle-aligned">${
                item.confirmed
                    ? item.quantity
                    : `<input type="number" min="1" value="0" />`
            }</td>
            <td class="middle-aligned">${
                item.confirmed
                    ? item.purchasePrice
                    : `<input type="text" value="0.0" />`
            }</td>
            <td class="middle-aligned">${
                item.confirmed
                    ? item.salePrice
                    : `<input type="text" value="0.0">`
            }</td>
            <td class="middle-aligned">${item.balanceToPay}</td>
            <td class="text-center">
                <button id="${item.id}">
                    ${item.confirmed ? 'Editar' : 'Confirmar'}
                </button>
            </td>
            <td class="text-center">
                <button id="${item.id}">Eliminar</button>
            </td>
        </tr>`;
    }

    function getProductName(product) {
        if (
            product.hasOwnProperty('brand') &&
            product.hasOwnProperty('branded')
        ) {
            const brand = product.brand.name;
            const branded = product.branded.name;

            return `${brand} ${branded} ${product.description}`;
        }

        return product.name;
    }

    function translate(key) {
        const labels = getLabels();

        return labels[key];
    }

    function getLabels() {
        return {
            provider: 'Proveedor',
            type: 'Tipo de compra',
            invoiceNumber: 'Número de factura',
            paymentDate: 'Fecha de pago'
        };
    }

    return {
        isValid,
        formDataToObject,
        getCurrentOrder,
        sync,
        removeItem,
        getItem,
        addItem,
        render,
        removeOrder,
        setProducts,
        setItems,
        createDefaultItem,
        filter,
        isThereAnUnconfirmedItem,
        setForm,
        updateOrder
    };
}
