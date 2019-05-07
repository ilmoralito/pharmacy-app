document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('#products');

    productsContainer.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== 'A') return;

        const helper = makeHelper();

        const item = helper.createDefaultItem({
            id: target.id,
            product: target.textContent
        });

        helper.addItem(item);

        helper.setProducts();
    }
});
