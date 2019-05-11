function makeHelper() {
    function render(brandProducts) {
        const rows = brandProducts.map(brandedToRowView).join('');

        document.querySelector('#root').innerHTML = `
            <table class="table table-hover table-bordered">
                <col width="90%" />
                <col width="10%" />

                <thead>
                    <th>Nombre</th>
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
            <td class="text-center" style="vertical-align: middle;">
                <a href="#" id="${branded.id}">Editar</a>
            </td>
        </tr>`;
    }

    return {
        render
    };
}
