document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();

        fetchResource('medicines').then(medicines => {
            const results = medicines.filter(medicine => {
                return (
                    medicine.name.toLowerCase().includes(criteria) ||
                    (medicine.genericName &&
                        medicine.genericName
                            .toLowerCase()
                            .includes(criteria)) ||
                    (medicine.laboratory.name &&
                        medicine.laboratory.name
                            .toLowerCase()
                            .includes(criteria)) ||
                    medicine.presentation.name
                        .toLowerCase()
                        .includes(criteria) ||
                    medicine.measure.unit.toLowerCase().includes(criteria) ||
                    medicine.measure.abbreviation
                        .toLowerCase()
                        .includes(criteria) ||
                    medicine.quantity.toString().includes(criteria) ||
                    medicine.location.toLowerCase().includes(criteria)
                );
            });

            const helper = makeHelper();

            helper.render(results);
        });
    }
});
