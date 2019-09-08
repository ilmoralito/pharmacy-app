document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.paymentForm;

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const validator = validate(formData);

    if (!validator.ok) {
      alert(validator.message);

      return;
    }

    fetch("/pharmacyApp/payments", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        if (!json.ok) {
          const messages = getErrorMessages(json.errors.errors);

          alert(messages);

          return;
        }

        location.reload(true);
      })
      .catch(error => console.error(error.message));
  }

  function validate(formData) {
    const dataset = Array.from(formData);

    for (const [field, value] of dataset) {
      const label = getFieldLabel(field);

      if (!value) {
        return { ok: false, message: `Valor del campo ${label} es requerido` };
      }

      if (isNaN(value)) {
        return {
          ok: false,
          message: `El tipo de dato del campo ${label} es invalido`
        };
      }
    }

    return { ok: true };
  }

  function getErrorMessages(errors) {
    return errors.map(error => error.message).join("\n");
  }

  function getFieldLabel(fieldName) {
    const labels = {
      id: "Id del cliente",
      amountPaid: "Saldo a pagar"
    };

    return labels[fieldName];
  }
});
