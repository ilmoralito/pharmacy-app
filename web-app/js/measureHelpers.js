function measureToRowView(measure) {
    return `<tr>
                <td>${measure.unit}</td>
                <td>${measure.abbreviation}</td>
                <td class="text-center" style="vertical-align: middle;">
                    <a href="#" id="${measure.id}">Editar</a>
                </td>
            </tr>`;
}
