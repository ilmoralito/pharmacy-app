document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('laboratories').then(laboratories => {
            const results = laboratories.filter(laboratory =>
                laboratory.name.toLowerCase().includes(criteria)
            );

            const helper = makeHelper();

            helper.render(results);
        });
    }
});
