document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('measures').then(measures => {
            const results = measures.filter(
                measure =>
                    measure.unit.toLowerCase().includes(criteria) ||
                    measure.abbreviation.toLowerCase().includes(criteria)
            );

            sync(results);
        });
    }

    function sync(results) {
        const rows = results.map(measureToRowView).join('');

        document.querySelector('tbody').innerHTML = rows;
    }
});
