function diarySpendToRowView(diarySpend) {
    return `<tr>
        <td>${diarySpend.createdBy}</td>
        <td>${diarySpend.timeCreated}</td>
        <td>${diarySpend.description}</td>
        <td>${diarySpend.amount}</td>
        <td>
            <a href="#" id="${diarySpend.id}">Editar</a>
        </td>
    </tr>`;
}

function getTotalDailyExpenses(expenses) {
    return expenses.reduce((accumulator, currentValue) => {
        accumulator += currentValue.amount;

        return accumulator;
    }, 0);
}