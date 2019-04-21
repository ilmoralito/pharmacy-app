document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('branded')
            .then(brandProducts => {
                const results = brandProducts.filter(branded => {
                    return (
                        branded.name.toLowerCase().includes(criteria) ||
                        branded.location.toLowerCase().includes(criteria)
                    );
                });

                render(results);
            })
            .catch(error => console.error(error.message));
    }
});
