document.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('#filter');

    if (!filter) return;

    const providerId = getCurrentProviderId();

    filter.addEventListener('input', handleInput);

    function handleInput(event) {
        const criteria = event.target.value.toLowerCase();

        getMerchandises(providerId).then(json => {
            const results = json.merchandises.filter(merchandise =>
                merchandise.name.toLowerCase().includes(criteria)
            );

            render({
                merchandises: results,
                merchandisesSupplier: json.merchandisesSupplier
            });
        });
    }

    async function getMerchandises(id) {
        const endpoint = `/pharmacyApp/providers/${id}/merchandises`;
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        const response = await fetch(endpoint, options);

        return await response.json();
    }

    function getCurrentProviderId() {
        return window.location.href.split('/')[5];
    }

    function render({ merchandises, merchandisesSupplier }) {
        const rows = merchandises
            .map(merchandise => {
                return `
                    <tr>
                        <td>
                            <input
                                type="checkbox"
                                id="merchandise"
                                name="merchandise"
                                value="${merchandise.id}"
                                data-provider-id="${providerId}"
                                ${
                                    merchandisesSupplier.find(
                                        good => good.name === merchandise.name
                                    )
                                        ? 'checked'
                                        : ''
                                }
                            />
                        </td>
                        <td>${merchandise.name}</td>
                    </tr>`;
            })
            .join('');

        document.querySelector('tbody').innerHTML = rows;
    }
});
