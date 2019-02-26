document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('table tbody');
    const filter = document.querySelector('#filter');
    let medicines = [];

    filter.addEventListener('keyup', handleFilter);

    function handleFilter(event) {
        const criteria = event.target.value.toLowerCase();
        const results = medicines.filter(medicine =>
                medicine.name.toLowerCase().includes(criteria) ||
                medicine.genericName.toLowerCase().includes(criteria) ||
                medicine.location.toLowerCase().includes(criteria) ||
                medicine.code.toLowerCase().includes(criteria)
            );

        sync(results);
    }

    function fetchMedicines() {
        const providerId = getCurrentProviderId();

        fetch(`/pharmacyApp/provider/${providerId}/medicines?format=json`)
            .then(response => response.json())
            .then(json => medicines = json)
            .catch(error => console.error(error.message()));
    }

    function getCurrentProviderId() {
        return document.querySelector('input[type=hidden]').value;
    }

    function sync(results) {
        const rows = results.map(toRowView).join('');

        root.innerHTML = rows;
    }

    function toRowView(medicine) {
        return `<tr>
            <td style="vertical-align: middle;">
                <a href="#" data-presentations='${JSON.stringify(medicine.presentations)}'>${medicine.name}</a>
            </td>
            <td style="vertical-align: middle;">${medicine.genericName}</td>
            <td style="vertical-align: middle;">${medicine.location}</td>
            <td style="vertical-align: middle;">${medicine.code}</td>
            <td>
                <a href="edit/${medicine.id}" class="btn btn-default btn-sm">Editar</a>
            </td>
        </tr>`;
    }

    fetchMedicines();
});

