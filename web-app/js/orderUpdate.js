document.addEventListener('DOMContentLoaded', () => {
    const form = document.forms.form;

    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const helper = makeHelper();
        const formData = new FormData(form);
        const order = helper.formDataToObject(formData);
        const answer = helper.isValid(order);

        if (!answer.ok) {
            alert(`${answer.key} es ${answer.message}`);

            return;
        }

        const currentOrder = helper.getCurrentOrder();

        if (currentOrder.provider !== order.provider) {
            if (!confirm('¿Seguro de continuar?')) return;

            helper.sync(order);

            location.href = `/pharmacyApp/orders/${order.provider}/create`;
        }

        helper.sync(order);
        helper.setForm(form);

        document.querySelector('.toddler').classList.add('close');
    }
});
