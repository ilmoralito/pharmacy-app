document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');

    if (!table) {
        return false;
    }

    table.addEventListener('click', handleClick);

    function handleClick(event) {
        const target = event.target;

        if (target.nodeName === 'A') {
            if (target.textContent === 'Mostrar detalle') {
                target.textContent = 'Ocultar detalle';

                const detailRow = createDetailRow();

                insertAfter(detailRow, target.closest('tr'));

                fetch(`/pharmacyApp/expenses/of/${target.dataset.datecreated}`)
                    .then(response => response.json())
                    .then(expenses => {
                        detailRow.firstElementChild.innerHTML = expensesDetailSync(
                            expenses
                        );
                    })
                    .catch(error => console.error(error.message));

                return;
            }

            target.textContent = 'Mostrar detalle';

            removeDetailRow(target);
        }
    }

    function createDetailRow() {
        const tr = document.createElement('tr');
        const td = document.createElement('td');

        td.colSpan = 3;
        td.style.padding = 0;

        tr.appendChild(td);

        return tr;
    }

    function removeDetailRow(target) {
        target.closest('tr').nextElementSibling.remove();
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
    }
});
