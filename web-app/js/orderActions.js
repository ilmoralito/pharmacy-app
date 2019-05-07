document.addEventListener('DOMContentLoaded', () => {
    const itemsTable = document.querySelector('#items');

    if (!itemsTable) return;

    itemsTable.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'BUTTON') return;

        const helper = makeHelper();
        const row = target.closest('tr');

        if (target.textContent === 'Eliminar') {
            if (!confirm('¿Seguro de continuar?')) return;

            helper.removeItem(target.id);
            helper.setProducts();
            row.remove();
        }

        if (target.textContent.trim() === 'Confirmar') {
            const dataset = fetchDataset(row);
            const valid = isValid(dataset);

            if (!valid) {
                alert('Datos no validos');

                return;
            }

            const item = helper.getItem(target.id);
            const newItem = Object.assign(
                {},
                item,
                { quantity: dataset.quantity },
                { purchasePrice: dataset.purchasePrice },
                { salePrice: dataset.salePrice },
                { balanceToPay: dataset.quantity * dataset.salePrice },
                { confirmed: true }
            );

            helper.removeItem(item.id);
            helper.addItem(newItem);

            syncRow({ row, item: newItem });
        }

        if (target.textContent.trim() === 'Editar') {
            const item = helper.getItem(target.id);
            const [, quantity, purchasePrice, salePrice] = [...row.cells];

            quantity.innerHTML = createInput({
                id: 'quantity',
                defaultValue: quantity.textContent,
                type: 'number'
            });
            purchasePrice.innerHTML = createInput({
                id: 'purchasePrice',
                defaultValue: purchasePrice.textContent
            });
            salePrice.innerHTML = createInput({
                id: 'salePrice',
                defaultValue: salePrice.textContent
            });

            target.textContent = 'Confirmar';
        }
    }

    function fetchDataset(row) {
        const [, quantity, purchasePrice, salePrice] = [...row.cells];

        const quantityValue = quantity.querySelector('input').value;
        const salePriceValue = salePrice.querySelector('input').value;
        const purchasePriceValue = purchasePrice.querySelector('input').value;

        return {
            quantity: quantityValue,
            salePrice: salePriceValue,
            purchasePrice: purchasePriceValue
        };
    }

    function isValid(dataset) {
        for (const key in dataset) {
            const value = dataset[key];

            if (value === '0' || !value || parseFloat(value) < 1) {
                return false;
            }
        }

        if (parseFloat(dataset.purchasePrice) > parseFloat(dataset.salePrice)) {
            return false;
        }

        return true;
    }

    function syncRow({ row, item }) {
        row.innerHTML = `<tr>
            <td class="middle-aligned">${item.product}</td>
            <td class="middle-aligned">${item.quantity}</td>
            <td class="middle-aligned">${item.purchasePrice}</td>
            <td class="middle-aligned">${item.salePrice}</td>
            <td class="middle-aligned">${item.salePrice * item.quantity}</td>
            <td class="text-center">
                <button id="${item.id}">Editar</button>
            </td>
            <td class="text-center">
                <button id="${item.id}">Eliminar</button>
            </td>
        </tr>`;
    }
});
