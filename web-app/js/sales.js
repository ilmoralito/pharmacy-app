document.addEventListener('DOMContentLoaded', () => {
    const inventory = document.querySelector('#inventory');

    if (!inventory) return;

    inventory.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'A') return;

        const helper = makeHelper();
        const inventoryHelper = makeInventoryHelper();

        helper.updateSalesDetail({ ...target.dataset });
        inventoryHelper.updateInventoryList();
    }
});
