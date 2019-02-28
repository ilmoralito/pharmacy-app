document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const criteria = event.target.value.toLowerCase();
        const results = dataset
            .filter(data => data.count.includes(criteria) || data.presentation.name.toLowerCase().includes(criteria) || data.measure.unit.toLowerCase().includes(criteria));

        sync(results);
    }

    function sync(results) {
        const rows = results.map(result => `<tr>
            <td>${result.presentation.name}</td>
            <td>${result.measure.unit}</td>
            <td>${result.count}</td>
            <td class="text-center" style="vertical-align: middle;">
                <a href="#" id="${result.id}">Editar</a>
            </td>
        <tr>`).join('');

        document.querySelector('tbody').innerHTML = rows;
    }

    fetchResource('measurePresentations?format=json');
});

