document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    const tbody = document.querySelector('tbody');

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();
        const providerId = getCurrentProviderId();
        const endpoint = `/pharmacyApp/providers/${providerId}/branders`;

        fetchResource(endpoint).then(dataset => {
            const branders = dataset.branders.filter(data => {
                return (
                    data.brand.name.toLowerCase().includes(criteria) ||
                    data.branded.name.toLowerCase().includes(criteria)
                );
            });

            render({
                branders: branders,
                providerBranders: dataset.providerBranders
            });
        });
    }

    function render({ branders, providerBranders }) {
        const rows = branders
            .map(brandBranded => {
                return `<tr>
                    <td>
                        <input type="checkbox"
                            id="brandBranded"
                            name="brandBranded"
                            value="${brandBranded.id}"
                            data-provider-id="${1}"
                            ${
                                isChecked({
                                    brandBranded,
                                    providerBranders
                                })
                                    ? 'checked'
                                    : ''
                            }
                        />
                    </td>
                    <td>${brandBranded.toString}</td>
                </tr>`;
            })
            .join('');

        tbody.innerHTML = rows;
    }

    function isChecked({ brandBranded, providerBranders }) {
        return providerBranders.some(providerBrander => {
            return providerBrander.toString.includes(brandBranded.toString);
        });
    }

    function getCurrentProviderId() {
        return location.href.split('/')[5];
    }
});
