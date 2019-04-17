function measurePresentationToRowView(measurePresentation) {
    return `<tr>
        <td>${measurePresentation.presentation.name}</td>
        <td>${measurePresentation.measure.unit}</td>
        <td>${measurePresentation.count}</td>
        <td class="text-center" style="vertical-align: middle;">
            <a href="#" id="${measurePresentation.id}">Editar</a>
        </td>
    </tr>`;
}
