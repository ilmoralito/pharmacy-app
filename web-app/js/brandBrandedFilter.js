document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('branders').then(branders => {
            const results = branders.filter(brandBranded => {
                return (
                    brandBranded.brand.name.toLowerCase().includes(criteria) ||
                    brandBranded.branded.name
                        .toLowerCase()
                        .includes(criteria) ||
                    brandBranded.description.toLowerCase().includes(criteria)
                );
            });

            render(results);
        });
    }
});
