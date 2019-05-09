document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.type.addEventListener('change', toggleType);

    function toggleType() {
        if (form.type.value === 'cash payment') {
            form.paymentDate.closest('.form-group').classList.add('hide');

            return;
        }

        form.paymentDate.closest('.form-group').classList.remove('hide');
    }

    toggleType();
});
