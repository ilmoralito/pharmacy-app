function sync(merchandises) {
    const rows = merchandises.map(merchandiseToRowView).join('');

    document.querySelector('#root').innerHTML = `
        <table class="table table-hover table-bordered">
            <col width="20%" />
            <col width="70" />
            <col width="10%" />

            <thead>
                <tr>
                    <th>Articulo</th>
                    <th>Ubicación</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                ${rows}
            </tbody>
        </table>`;
}

function merchandiseToRowView(merchandise) {
    return `<tr>
        <td>${merchandise.name}</td>
        <td>${merchandise.location}</td>
        <td class="text-center" style="vertical-align: middle;">
            <a href="#" id="${merchandise.id}">Editar</a>
        </td>
    </tr>`;
}
