function render(branders) {
    const rows = branders.map(brandBrandedToRowView).join('');

    document.querySelector('#root').innerHTML = `
        <table class="table table-hover table-bordered">
            <col width="20%" />
            <col width="20%" />
            <col width="40%" />
            <col width="10%" >
            <col width="10%" />

            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Producto</th>
                    <th>Descripción</th>
                    <th>Ubicación</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
}

function brandBrandedToRowView(brandBranded) {
    return `
        <tr>
            <td>${brandBranded.brand.name}</td>
            <td>${brandBranded.branded.name}</td>
            <td>${brandBranded.description}</td>
            <td>${brandBranded.location}</td>
            <td class="text-center" style="vertical-align: middle;">
                <a href="" id="${brandBranded.id}">Editar</a>
            </td>
        </tr>`;
}
