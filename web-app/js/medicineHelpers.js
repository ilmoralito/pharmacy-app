function makeHelper() {
    const context = document.querySelector('#filterContext');
    const root = document.querySelector('#root');

    function render(medicines) {
        const rows = medicines.map(medicineToRowView).join('');

        root.innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="15%">
                <col width="28%">
                <col width="20%">
                <col width="10%">
                <col width="5%">
                <col width="5%">
                <col width="7%">
                <col width="10%">

                <thead>
                    <tr>
                        <th>Laboratorio</th>
                        <th>Nombre</th>
                        <th>Genérico</th>
                        <th>Presentación</th>
                        <th>Medida</th>
                        <th>Cantidad</th>
                        <th>Ubicación</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    ${rows}
                </tbody>
            </table>`;
    }

    /**
     * Render dataset table
     * @param  {string} options.id        Used to set id and name to checkbox
     * @param  {string} options.caption   Table caption text
     * @param  {array}  options.elements  Elements to be printed
     */
    function display({ id, caption, elements }) {
        const rows = elements
            .map(element =>
                propertyToRowView({
                    id,
                    value: element
                })
            )
            .join('');

        document.querySelector(`#${id}`).innerHTML = `
                <table class="table table-bordered table-hover">
                    <col width="1%" />
                    <col width="99%" />

                    <caption>${caption}</caption>

                    <tbody>
                        ${rows}
                    </tbody>
                </table>`;
    }

    async function sync() {
        const endpoints = ['medicines/laboratories', 'medicines/genericnames'];
        const responses = await Promise.all(
            endpoints.map(endpoint => fetch(endpoint))
        );
        const json = await Promise.all(
            responses.map(response => response.json())
        );

        return json;
    }

    function medicineToRowView(medicine) {
        return `<tr>
                    <td>${formatLaboratory(medicine.laboratory)}</td>
                    <td>${medicine.name}</td>
                    <td>${formatGenericName(medicine.genericName)}</td>
                    <td>${medicine.presentation.name}</td>
                    <td>${medicine.measure.abbreviation}</td>
                    <td>${medicine.quantity}</td>
                    <td>${medicine.location}</td>
                    <td class="text-center" style="vertical-align: middle;">
                        <a href="" id="${medicine.id}">Editar</a>
                    </td>
                </tr>`;
    }

    function propertyToRowView({ id, value }) {
        return `<tr>
                    <td>
                        <input type="checkbox" name="${id}" id="${id}" value="${value}" />
                    </td>
                    <td>${value}</td>
                </tr>`;
    }

    function isFilterPlusContextOpen() {
        return context.classList.length === 0;
    }

    function formatLaboratory(laboratory) {
        return laboratory.name ? laboratory.name : '';
    }

    function formatGenericName(genericName) {
        return genericName ? genericName : '';
    }

    return {
        isFilterPlusContextOpen,
        display,
        render,
        sync
    };
}
