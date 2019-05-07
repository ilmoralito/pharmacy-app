document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const helper = makeHelper();

        helper.filter(event.target.value.toLowerCase());
    }
});
