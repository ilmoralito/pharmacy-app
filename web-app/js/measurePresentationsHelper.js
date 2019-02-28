function addRowToTable(dataset) {
    const tr = document.createElement('tr');
    const tdPresentation = document.createElement('td');
    const tdMeasure = document.createElement('td');
    const tdCount = document.createElement('td');
    const tdEdit = document.createElement('td');
    const a = document.createElement('a');

    tdPresentation.textContent = dataset.presentation.name;
    tdMeasure.textContent = dataset.measure.unit;
    tdCount.textContent = dataset.count;

    a.href="#";
    a.id = dataset.id;
    a.textContent = 'Editar';

    tdEdit.className = 'text-center';
    tdEdit.style.verticalAlign = 'middle';

    tdEdit.appendChild(a);

    tr.appendChild(tdPresentation);
    tr.appendChild(tdMeasure);
    tr.appendChild(tdCount);
    tr.appendChild(tdEdit);

    document.querySelector('table tbody').appendChild(tr);
}