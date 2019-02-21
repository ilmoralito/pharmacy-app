document.addEventListener('DOMContentLoaded', () => {
    const filterTrigger = document.querySelector('#filterTrigger');
    const table = document.querySelector('table');
    const tbody = table.tBodies[0];
    const clients = getClients();

    filterTrigger.addEventListener('keyup', filter);

    function filter() {
        const term = this.value;
        const results = clients.filter(client => client.fullName.toLowerCase().includes(term));

        sync(results);
    }

    function sync(results) {
        const rows = results.map(toTrView).join('');

        tbody.innerHTML = rows;
    }

    function toTrView(result) {
        return `<tr>
            <td>
                <a href="show/${result.id}">${result.fullName}</a>
            </td>
            <td>${result.address}</td>
            <td>${result.identificationCard}</td>
            <td>${result.phones}</td>
            <td>${result.status}</td>
        </tr>`;
    }

    function getClients() {
        const rows = [...tbody.rows].map(row => {
            const dataset = {};
            const cells = [...row.cells];

            dataset.id = cells[0].querySelector('a').href.split('/')[6];;
            dataset.fullName = cells[0].textContent.trim();
            dataset.address = cells[1].textContent;
            dataset.identificationCard = cells[2].textContent;
            dataset.phones = cells[3].textContent;
            dataset.status = cells[4].textContent;

            return dataset;
        });

        return rows;
    }
});
