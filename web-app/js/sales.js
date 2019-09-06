const SaleComponent = {
  root: document.querySelector("#root"),

  form: this.root.querySelector("form"),

  client: document.querySelector("#client"),

  trigger: document.querySelector(".help-block a"),

  confirm: document.querySelector(".modal-footer button"),

  init() {
    this.trigger.addEventListener("click", this.handleClick.bind(this));

    this.form.addEventListener("submit", this.handleSubmit.bind(this));

    this.confirm.addEventListener("click", this.handleConfirm.bind(this));
  },

  handleClick(event) {
    event.preventDefault();

    this.toggle();
  },

  handleCancelClick(event) {
    event.preventDefault();

    const target = event.target;

    if (target.nodeName !== "A") return false;

    this.root.innerHTML = "";
  },

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("/pharmacyApp/clients", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then(response => response.json())
      .then(json => {
        if (json.status !== "ok") {
          alert(json.errors.errors.map(error => error.message).join("\n"));

          return false;
        }

        const { id, fullName } = json.client;
        const option = new Option(fullName, id, true, true);

        this.client.appendChild(option);
        this.form.reset();
        this.toggle();
      });
  },

  handleConfirm(event) {
    event.preventDefault();

    const typeOfSale = document.querySelector("#typeOfSale");
    const client = document.querySelector("#client");

    if (!typeOfSale.value) {
      alert("El tipo de venta es requerido");

      return false;
    }

    if (!client.value) {
      alert("El cliente requerido");

      return false;
    }

    if (location.pathname.includes("create")) {
      NewSaleComponent.setTypeOfSale(typeOfSale.value);
      NewSaleComponent.setClientId(client.value);

      $("#saleModal").modal("hide");

      return false;
    }

    location.replace(
      `/pharmacyApp/sales/create/${typeOfSale.value}/${client.value}`
    );
  },

  toggle() {
    this.root.classList.toggle("show");
  }
};

SaleComponent.init();
