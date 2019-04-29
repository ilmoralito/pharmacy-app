document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    const tbody = document.querySelector('tbody');

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();
        const providerId = getCurrentProviderId();
        const endpoint = `/pharmacyApp/providers/${providerId}/medicines`;

        fetchResource(endpoint).then(dataset => {
            const medicines = dataset.medicines.filter(data => {
                return data.name.toLowerCase().includes(criteria);
            });

            render({
                medicines: medicines,
                providerMedicines: dataset.providerMedicines
            });
        });
    }

    function render({ medicines, providerMedicines }) {
        const rows = medicines
            .map(medicine => {
                return `<tr>
                    <td>
                        <input type="checkbox"
                            id="medicine"
                            name="medicine"
                            value="${medicine.id}"
                            data-provider-id="${1}"
                            ${
                                isChecked({ medicine, providerMedicines })
                                    ? 'checked'
                                    : ''
                            }
                        />
                    </td>
                    <td>${medicine.name}</td>
                </tr>`;
            })
            .join('');

        tbody.innerHTML = rows;
    }

    function isChecked({ medicine, providerMedicines }) {
        return providerMedicines.some(providerMedicine => {
            return providerMedicine.name.includes(medicine.name);
        });
    }

    function getCurrentProviderId() {
        return location.href.split('/')[5];
    }
});
