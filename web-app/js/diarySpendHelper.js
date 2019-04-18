function diarySpendToRowView(diarySpend) {
    return `<tr>
        <td>${diarySpend.createdBy}</td>
        <td>${diarySpend.timeCreated}</td>
        <td>${diarySpend.description}</td>
        <td>${diarySpend.amount}</td>
        <td class="text-center">
            <a href="#" id="${diarySpend.id}">Editar</a>
        </td>
    </tr>`;
}

function diarySpendDetailToRowView(diarySpend) {
    return `<tr>
        <td>${diarySpend.createdBy}</td>
        <td>${diarySpend.timeCreated}</td>
        <td>${diarySpend.description}</td>
        <td>${diarySpend.amount}</td>
    </tr>`;
}

function getTotalDailyExpenses(expenses) {
    return expenses.reduce((accumulator, currentValue) => {
        accumulator += currentValue.amount;

        return accumulator;
    }, 0);
}

function expensesDetailSync(expenses) {
    const rows = expenses.map(diarySpendDetailToRowView).join('');

    return `
        <table class="table table-hover table-bordered" style="margin: 0; padding: 0; border-style: 0;">
            <col width="15%">
            <col width="12%">
            <col width="65%">
            <col width="8%">

            <thead>
                <tr>
                    <th>Creado por</th>
                    <th>Hora creación</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
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
