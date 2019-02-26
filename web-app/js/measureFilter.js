document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('table tbody');
    const filter = document.querySelector('#filter')

    filter.addEventListener('keyup', handleKeyup);

    function handleKeyup(event) {
        const criteria = event.target.value.toLowerCase();
        const results = measures.filter(measure => measure.unit.toLowerCase().includes(criteria));

        sync(results);
    }

    function sync(results) {
        const trs = results.map(result => `<tr>
            <td>${result.unit}</td>
            <td>${result.abbreviation}</td>
            <td class="text-center" style="vertical-align: middle;">
                <a href="#" id="${result.id}">Editar</a>
            </td>
        </tr>`).join('');

        root.innerHTML = trs;
    }

    fetchMeasures();
});

