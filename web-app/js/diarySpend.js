document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const options = {
            method: 'POST',
            body: formData
        };

        fetch('expenses', options)
            .then(response => response.json())
            .then(diarySpend => {
                if (diarySpend.ok) {
                    fetchResource('expenses').then(expenses => {
                        if (expenses.length === 1) {
                            window.location.href = 'expenses';
                        } else {
                            cleanErrors();

                            sync(expenses);

                            cleanInputs(event.target);
                        }
                    });

                    return;
                }

                renderErrors(diarySpend.errors.errors);
            })
            .catch(error => console.error(error.message));
    }
});

function sync(expenses) {
    const rows = expenses.map(diarySpendToRowView).join('');

    document.querySelector('#root').innerHTML = `
        <table class="table table-hover table-bordered">
            <col width="15%">
            <col width="10%">
            <col width="59%">
            <col width="8%">
            <col width="11%">

            <thead>
                <tr>
                    <th>Creado por</th>
                    <th>Hora creación</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${rows}
                <tr>
                    <td colspan="3"></td>
                    <td id="total">${getTotalDailyExpenses(expenses)}</td>
                </tr>
            </tbody>
        </table>`;
}
