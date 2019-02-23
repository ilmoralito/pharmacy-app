document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('table tbody');
    const filter = document.querySelector('#filter');
    let dataset = [];

    filter.addEventListener('keyup', handleFilter);

    function handleFilter(event) {
        const criteria = event.target.value.toLowerCase();
        const results = dataset.filter(good => good.name.toLowerCase().includes(criteria));

        sync(results);
    }

    function getGoods() {
        const provider = getCurrentProvider();

        fetch(`/pharmacyApp/merchandise/list/${provider}.json`)
            .then(response => response.json())
            .then(json => dataset = json)
            .catch(error => console.error(error.message()));
    }

    function getCurrentProvider() {
        return document.querySelector('input[type=hidden]').value;
    }

    function sync(results) {
        const rows = results.map(goodToRowView).join('');

        root.innerHTML = rows;
    }

    function goodToRowView(good) {
        return `<tr>
            <td style="vertical-align: middle;">${good.name}</td>
            <td class="text-center">
                <a href="#" id="${good.id}" class="btn btn-default btn-sm">Editar</a>
            </td>
        </tr>`;
    }

    getGoods();
});
