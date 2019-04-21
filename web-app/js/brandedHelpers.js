function render(brandProducts) {
    const rows = brandProducts.map(brandedToRowView).join('');

    document.querySelector('#root').innerHTML = `
        <table class="table table-hover table-bordered">
            <col width="20%" />
            <col width="70%" />
            <col width="10%" />

            <thead>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th></th>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>`;
}

function brandedToRowView(branded) {
    return `<tr>
        <td>${branded.name}</td>
        <td>${branded.location}</td>
        <td class="text-center">
            <a href="#" id="${branded.id}">Editar</a>
        </td>
    </tr>`;
}
