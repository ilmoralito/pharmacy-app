const Sale = {
    get typeOfSale() {
        return this._typeOfSale;
    },

    set typeOfSale(value) {
        if (!value) {
            throw new Error("Tipo de venta es requerido");
        }

        if (!["cash", "credit"].includes(value)) {
            throw new Error("Valor de tipo de pago invalido");
        }

        this._typeOfSale = value;
    },

    get client() {
        return this._client;
    },

    set client(value) {
        if (!value) {
            throw new Error("Cliente es requerido");
        }

        this._client = value;
    }
};

const ClientComponent = {
    root: document.querySelector("#root"),

    client: document.querySelector("#client"),

    handleClick(event) {
        event.preventDefault();

        this.toggle();
    },

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const body = JSON.stringify(Object.fromEntries(formData));

        fetch("/pharmacyApp/clients", { method: "POST", body: body })
            .then(response => response.json())
            .then(json => {
                if (json.status !== "ok") {
                    const message = json.errors.errors
                        .map(error => error.message)
                        .join("\n");

                    alert(message);

                    return false;
                }
                const { id, fullName } = json.client;
                const option = new Option(fullName, id, true, true);

                this.client.appendChild(option);

                event.target.reset();

                this.toggle();
            });
    },

    toggle() {
        this.root.classList.toggle("show");
    },

    init() {
        document
            .querySelector("button#toggleClientForm")
            .addEventListener("click", this.handleClick.bind(this));

        this.root
            .querySelector("form")
            .addEventListener("submit", this.handleSubmit.bind(this));
    }
};

const SaleComponent = {
    handleClick(event) {
        event.preventDefault();

        const typeOfSale = document.querySelector("#typeOfSale").value;
        const client = document.querySelector("#client").value;

        try {
            Sale.typeOfSale = typeOfSale;
            Sale.client = client;
        } catch (error) {
            alert(error.message);

            return false;
        }

        location.replace(
            `/pharmacyApp/sales/create/${Sale.typeOfSale}/${Sale.client}`
        );
    },

    init() {
        document
            .querySelector(".modal-footer button")
            .addEventListener("click", this.handleClick.bind(this));
    }
};

ClientComponent.init();

SaleComponent.init();
