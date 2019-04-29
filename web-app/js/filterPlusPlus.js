document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filterPlusPlus');

    if (!filter) return;

    const context = document.querySelector('#filterContext');

    filter.addEventListener('click', handleClick);
    context.addEventListener('change', handleChange);

    function handleChange(event) {
        const target = event.target;

        if (target.nodeName !== 'INPUT') return;

        const laboratories = getItems({
            context: context.querySelector('#laboratories')
        });
        const genericnames = getItems({
            context: context.querySelector('#genericnames')
        });

        const formData = new FormData();

        formData.append('laboratories', laboratories);
        formData.append('genericnames', genericnames);

        fetch('medicines/filter', { method: 'POST', body: formData })
            .then(response => response.json())
            .then(json => {
                const helper = makeHelper();

                helper.render(json.medicines);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getItems({ context }) {
        return [...context.querySelectorAll('input[type=checkbox]')]
            .filter(checkbox => checkbox.checked)
            .map(checkbox => (checkbox.value ? checkbox.value : 'empty'));
    }

    function handleClick(event) {
        if (!context.classList.length) {
            context.classList.add('hidden');

            return;
        }

        const helper = makeHelper();

        helper.sync().then(json => {
            const [laboratories, genericnames] = json;

            helper.display({
                id: 'laboratories',
                caption: 'Laboratorios',
                elements: laboratories
            });

            helper.display({
                id: 'genericnames',
                caption: 'Nombres genericos',
                elements: genericnames
            });

            context.classList.remove('hidden');
        });
    }
});
