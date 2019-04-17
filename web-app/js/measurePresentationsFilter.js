document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('measurePresentations').then(measurePresentations => {
            const results = measurePresentations.filter(
                data =>
                    data.count.includes(criteria) ||
                    data.presentation.name.toLowerCase().includes(criteria) ||
                    data.measure.unit.toLowerCase().includes(criteria)
            );

            sync(results);
        });
    }

    function sync(measurePresentations) {
        const rows = measurePresentations
            .map(measurePresentationToRowView)
            .join('');

        document.querySelector('tbody').innerHTML = rows;
    }
});
