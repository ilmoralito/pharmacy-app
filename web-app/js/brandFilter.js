document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const text = event.target.value;

        fetchResource('brands').then(brands => {
            const results = brands.filter(data =>
                data.name.toLowerCase().includes(text.toLowerCase())
            );

            sync(results);
        });
    }

    function sync(brands) {
        const rows = brands.map(brandToRow).join('');

        document.querySelector('tbody').innerHTML = rows;
    }
});
