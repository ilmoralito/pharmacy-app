function brandToRow(brand) {
    return  `<tr>
        <td>${brand.name}</td>
        <td class="text-center" style="vertical-align: middle;">
            <a href="#" id="${brand.id}">Editar</a>
        </td>
    </tr>`;
}
