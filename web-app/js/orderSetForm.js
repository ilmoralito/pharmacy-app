document.addEventListener('DOMContentLoaded', () => {
    function setForm() {
        const form = document.forms.form;
        const helper = makeHelper();
        const order = helper.getCurrentOrder();

        for (const key in order) {
            if (!form[key]) continue;

            form[key].value = order[key];
        }
    }

    setForm();
});
