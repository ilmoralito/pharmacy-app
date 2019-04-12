document.addEventListener('DOMContentLoaded', () => {
    const filterTrigger = document.querySelector('#filterTrigger');
    const tbody = document.querySelector('tbody');

    filterTrigger.addEventListener('keyup', filter);

    function filter() {
        const term = this.value.toLowerCase();
        const results = clients.filter(client => {
            return (
                client.fullName.toLowerCase().includes(term) ||
                client.address.toLowerCase().includes(term) ||
                client.identificationCard.toLowerCase().includes(term)
            );
        });

        sync(results);
    }

    function sync(results) {
        const rows = results.map(toTrView).join('');

        tbody.innerHTML = rows;
    }

    function toTrView(result) {
        return `<tr>
            <td>
                <a href="clients/${result.id}">${result.fullName}</a>
            </td>
            <td>${result.address}</td>
            <td>${result.identificationCard}</td>
            <td>${result.phones}</td>
            <td>${result.status}</td>
        </tr>`;
    }
});
