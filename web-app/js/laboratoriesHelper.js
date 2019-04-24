function makeHelper() {
    function render(laboratories) {
        const rows = laboratories.map(laboratoryToRowView).join('');
        const root = document.querySelector('#root');

        root.innerHTML = `<table class="table table-hover table-bordered">
                    <col width="90%" />
                    <col width="10%" />

                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>`;
    }

    function laboratoryToRowView(laboratory) {
        return `<tr>
                    <td>${laboratory.name}</td>
                    <td class="text-center" style="vertical-align: middle;">
                        <a href="" id="${laboratory.id}">Editar</a>
                    </td>
                </tr>`;
    }

    return {
        render
    };
}
