document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('table tbody');
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleFilter);

    function handleFilter(event) {
        const providers = dataset.filter(data => {
            const criteria = event.target.value.toLowerCase();

            return data.name.toLowerCase().includes(criteria) || data.contact.fullName.toLowerCase().includes(criteria);
        });

        sync(providers);
    }

    function sync(providers) {
        const rows = providers.map(resultToRowView).join('');

        root.innerHTML = rows;
    }

    function resultToRowView(provider) {
        return `
            <tr>
                <td>
                    <a href="show/${provider.id}">${provider.name}</a>
                </td>
                <td>${provider.address}</td>
                <td>${provider.phone}</td>
                <td>${provider.status}</td>
                <td>
                    <a href="#">Productos</a>
                </td>
            </tr>`;
    }

    fetchDataset();
});
