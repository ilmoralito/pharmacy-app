document.addEventListener('DOMContentLoaded', () => {
    const paymentDate = document.querySelector('#paymentDate').value;

    var dp = $('#paymentDate')
        .datepicker({
            dateFormat: 'yyyy-mm-dd',
            autoClose: true,
            language: 'es',
            firstDay: 0
        })
        .data('datepicker');

    if (!paymentDate) return;

    dp.selectDate(new Date(paymentDate));
});
