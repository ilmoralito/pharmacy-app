const SaleComponent = {
  root: document.querySelector("#root"),

  form: this.root.querySelector("form"),

  client: document.querySelector("#client"),

  init() {
    const trigger = document.querySelector(".help-block a");

    trigger.addEventListener("click", this.handleClick.bind(this));

    this.form.addEventListener("submit", this.handleSubmit.bind(this));
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
        if (json.status !== 'ok') {
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

  toggle() {
    this.root.classList.toggle("show");
  }
};

SaleComponent.init();
