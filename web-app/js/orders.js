document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('#trigger');
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

        helper.sync(order);

        location.href = `orders/${order.provider}/create`;
    }

    function continueOrder() {
        const helper = makeHelper();
        const order = helper.getCurrentOrder();

        if (!order) return;

        trigger.outerHTML = `
            <a
                href="orders/${order.provider}/create"
                class="btn btn-primary">Continuar orden</a>`;
    }

    continueOrder();
});
