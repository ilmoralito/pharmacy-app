document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();

        fetch('inventory', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.json())
            .then(inventoryList => {
                const inventory = inventoryList.filter(inventory => {
                    return (
                        inventory.product.name
                            .toLowerCase()
                            .includes(criteria) ||
                        inventory.stock.toString().includes(criteria) ||
                        inventory.salePrice.toString().includes(criteria) ||
                        inventory.registeredBy.fullName
                            .toLowerCase()
                            .includes(criteria) ||
                        inventory.updatedBy.fullName
                            .toLowerCase()
                            .includes(criteria)
                    );
                });

                render(inventory);
            })
            .catch(error => console.error(error));
    }

    function render(inventory) {
        const rows = inventory.map(inventoryToRow).join('');

        document.querySelector('table#inventory tbody').innerHTML = rows;
    }

    function inventoryToRow(inventory) {
        return `<tr class="${inventory.stock <= 20 ? 'warning' : ''}">
                    <td>${inventory.product.name}</td>
                    <td>${inventory.stock}</td>
                    <td>${inventory.salePrice.toFixed(2)}</td>
                    <td class="text-center">
                        <a href="inventory/changeEnableStatus/${inventory.id}">
                            ${
                                inventory.enabled
                                    ? 'Habilitado'
                                    : 'No habilitado'
                            }
                        </a>
                    </td>
                    <td class="text-center">
                        <a href="inventory/${inventory.id}">Ver</g:link>
                    </td>
                </tr>`;
    }
});
