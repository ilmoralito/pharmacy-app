function presentationToRowView(presentation) {
    return `
        <tr>
            <td>${presentation.name}</td>
            <td class="text-center" style="vertical-align: middle;">
                <a href="#" id="${presentation.id}">Editar</a>
            </td>
        </tr>`;
}
