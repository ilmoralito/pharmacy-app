document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const text = event.target.value;
        const brands = dataset.filter(data => data.name.toLowerCase().includes(text.toLowerCase()));

        sync(brands);
    }

    function sync(brands) {
        const rows = brands.map(brandToRow).join('');

        document.querySelector('tbody').innerHTML = rows;
    }

    fetchResource('brands?format=json');
});
