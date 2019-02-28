document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('tbody');

    tbody.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName === 'A' && target.textContent === 'Medidas') {
            const parentTr = target.closest('tr');
            const tr = document.createElement('tr');
            const td = document.createElement('td');

            td.colSpan = 3;

            if (parentTr.nextElementSibling && parentTr.nextElementSibling.firstElementChild.getAttribute('colspan') === '3') {
                parentTr.nextElementSibling.remove();

                return;
            }

            fetch(`measurePresentations/byPresentation/${target.id}`)
                .then(response => response.json())
                .then(json => {
                    if (Object.keys(json).length) {
                        const dl = document.createElement('dl');

                        for (const measure in json) {
                            const dt = document.createElement('dt');

                            dt.textContent = measure;

                            dl.appendChild(dt)

                            for (const data of json[measure]) {
                                const dd = document.createElement('dd');
                                dd.textContent = `${data.count} ${data.measure.abbreviation}`;

                                dl.appendChild(dd);
                            }
                        }

                        td.appendChild(dl);

                        tr.appendChild(td);

                        parentTr.parentNode.insertBefore(tr, parentTr.nextSibling);

                        return;
                    }

                    td.textContent = 'Sin datos asociados';

                    tr.appendChild(td);

                    parentTr.parentNode.insertBefore(tr, parentTr.nextSibling);
                })
                .catch(error => console.error(error.message()));
        }
    }
});

