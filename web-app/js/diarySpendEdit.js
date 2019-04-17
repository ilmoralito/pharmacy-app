document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    body.addEventListener('click', handleClick);

    function handleClick(event) {
        const target = event.target;

        if (itsALink(target) && itsALinkWithinACell(target)) {
            event.preventDefault();

            const row = target.closest('tr');
            const cells = [...row.cells];
            const [, , description, amount] = cells;

            if (target.textContent === 'Editar') {
                target.textContent = 'Confirmar';

                const currentDescription = description.textContent;
                const currentAmount = amount.textContent;

                description.innerHTML = `<textarea name="description" id="description" class="form-control">${currentDescription}</textarea>`;
                amount.innerHTML = `<input name="amount" id="amount" class="form-control" value="${currentAmount}">`;

                return;
            }

            const newDescription = description.querySelector('#description').value;
            const newAmount = amount.querySelector('#amount').value;

            const formData = new FormData();

            formData.append('description', newDescription);
            formData.append('amount', newAmount);

            fetch(`expenses/${target.id}`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    if (json.ok) {
                        row.innerHTML = diarySpendToRowView(json.diarySpend);

                        // here I remembered the reason why reactjs is amazing
                        updateTotalDailyExpenses();

                        target.textContent = 'Editar';

                        return;
                    }

                    alertErrors(json.errors.errors);
                });
        }
    }

    function updateTotalDailyExpenses() {
        fetchResource('expenses').then(expenses => {
            const total = document.querySelector('#total');

            total.innerHTML = getTotalDailyExpenses(expenses);
        });
    }

    function itsALink(target) {
        return target.nodeName === 'A';
    }

    function itsALinkWithinACell(target) {
        return target.parentNode.nodeName === 'TD';
    }
});
