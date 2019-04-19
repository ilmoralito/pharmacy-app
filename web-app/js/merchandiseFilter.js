document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#root');
    const filter = document.querySelector('#filter');

    if (!filter) {
        return false;
    }

    filter.addEventListener('keyup', handleFilter);

    function handleFilter(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('merchandises').then(merchandises => {
            const results = merchandises.filter(good => {
                return (
                    good.name.toLowerCase().includes(criteria) ||
                    good.location.toLowerCase().includes(criteria)
                );
            });

            sync(results);
        });
    }
});
