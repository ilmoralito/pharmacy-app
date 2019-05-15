document.addEventListener('DOMContentLoaded', () => {
    const inventoryHelper = makeInventoryHelper();

    inventoryHelper.fetchInventory().then(inventoryList => {
        inventoryHelper.render(inventoryList);
    });
});
