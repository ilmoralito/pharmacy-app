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
        const provider = getCurrentProvider();

        fetch(`/pharmacyApp/medicine/list/${provider}.json`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                medicines = json
            })
            .catch(error => console.error(error.message()));
    }

    function getCurrentProvider() {
        return document.querySelector('input[type=hidden]').value;
    }

    function sync(results) {
        const rows = results.map(toRowView).join('');

        root.innerHTML = rows;
    }

    function toRowView(medicine) {
        return `<tr>
            <td>
                <a href="show/${medicine.id}">${medicine.name}</a>
            </td>
            <td>${medicine.genericName}</td>
            <td>${medicine.location}</td>
            <td>${medicine.code}</td>
        </tr>`;
    }

    fetchMedicines();
});

