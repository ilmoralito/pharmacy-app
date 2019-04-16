document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('presentations').then(presentations => {
            const results = presentations.filter(presentation =>
                presentation.name.toLowerCase().includes(criteria)
            );

            sync(results);
        });
    }

    function sync(presentations) {
        const rows = presentations.map(presentationToRowView).join('');

        document.querySelector('tbody').innerHTML = rows;
    }
});
