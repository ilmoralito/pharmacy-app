document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();
        const inventoryHelper = makeInventoryHelper();

        inventoryHelper.getCurrentInventoryList().then(inventoryList => {
            const result = inventoryList.filter(inventory =>
                inventory.product.name.toLowerCase().includes(criteria)
            );

            inventoryHelper.render(result);
        });
    }
});
