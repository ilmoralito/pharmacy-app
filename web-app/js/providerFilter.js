document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    filter.addEventListener('keyup', handleFilter);

    function handleFilter(event) {
        const criteria = event.target.value.toLowerCase();

        fetchProviders().then(providers => {
            const results = providers.filter(provider => {
                return (
                    provider.name.toLowerCase().includes(criteria) ||
                    provider.address.toLowerCase().includes(criteria) ||
                    provider.phone.toLowerCase().includes(criteria) ||
                    provider.phone.toLowerCase().includes(criteria) ||
                    provider.contact.fullName.toLowerCase().includes(criteria)
                );
            });

            sync(results);
        });
    }

    function sync(providers) {
        const rows = providers.map(resultToRowView).join('');

        document.querySelector('table tbody').innerHTML = rows;
    }

    function resultToRowView(provider) {
        return `
            <tr>
                <td>
                    <a href="providers/${provider.id}/show">${provider.name}</a>
                </td>
                <td>${provider.address}</td>
                <td>${provider.phone}</td>
                <td>${provider.status}</td>
                <td>
                    <a href="providers/${
                        provider.id
                    }/merchandises">Productos</a>
                </td>
            </tr>`;
    }
});
