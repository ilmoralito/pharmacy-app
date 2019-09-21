const ClientComponent = {
    clients: [],

    render(clients) {
        const root = document.querySelector("tbody");
        const rows = clients.map(this.clientToRowView).join("");

        root.innerHTML = rows;
    },

    clientToRowView(client) {
        return `<tr>
            <td>
                <a href="clients/${client.id}">${client.fullName}</a>
            </td>
            <td>${client.address}</td>
            <td>${client.identificationCard}</td>
            <td>${client.phones}</td>
            <td>${client.status}</td>
        </tr>`;
    },

    async fetchClients() {
        const response = await fetch("clients", {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });

        return await response.json();
    },

    init() {
        this.fetchClients().then(clients => (this.clients = clients));
    }
};

const FilterComponent = {
    input: document.querySelector("input#input"),

    handleInput(event) {
        const criteria = event.target.value.toLowerCase();
        const clientList = ClientComponent.clients;

        const clients = clientList.filter(client => {
            return (
                client.fullName.toLowerCase().includes(criteria) ||
                client.address.toLowerCase().includes(criteria) ||
                client.identificationCard.toLowerCase().includes(criteria) ||
                client.phones.includes(criteria)
            );
        });

        ClientComponent.render(clients);
    },

    init() {
        if (!this.input) return false;

        this.input.addEventListener("input", this.handleInput.bind(this));
    }
};

const AddClientComponent = {
    form: document.forms.form,

    handleSubmit(event) {
        event.preventDefault();

        fetch("clients", {
            method: "POST",
            body: new FormData(this.form)
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === "fail") {
                    const message = json.errors.errors
                        .map(error => error.message)
                        .join("\n");

                    alert(message);

                    return false;
                }

                this.form.reset();

                ClientComponent.fetchClients().then(clients => {
                    if (clients.length === 1) {
                        location.reload();

                        return false;
                    }

                    ClientComponent.render(clients);
                });
            })
            .catch(error => console.error(error.message));
    },

    init() {
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
};

const ImportComponent = {
    file: document.querySelector("input#file"),

    root: document.querySelector("div#summary-root"),

    handleChange(event) {
        const target = event.target;
        const file = target.files[0];

        if (!["text/csv"].includes(file.type)) {
            alert("Archivo invalido. Selecciona un archico de tipo CSV");

            return false;
        }

        const fileReader = new FileReader();

        fileReader.onload = result => {
            const clients = this.csvToArray(result);

            this.store(clients);
        };

        fileReader.readAsText(file);
    },

    csvToArray(dataset) {
        return dataset.target.result
            .split("\n")
            .filter(token => token)
            .map(item => item.split(","))
            .map(client => ({
                firstName: client[0],
                lastName: client[1],
                identificationCard: client[2],
                address: client[3],
                phones: client[4]
            }));
    },

    async store(clients) {
        const endpoint = "/pharmacyApp/clients/batch";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(clients)
        };
        const response = await fetch(endpoint, options);
        const json = await response.json();

        this.render(json);
    },

    render(json) {
        if (!document.querySelector("table")) {
            this.showSummary(json);

            setTimeout(() => {
                location.reload();
            }, 4000);
        }

        ClientComponent.fetchClients().then(clients => {
            ClientComponent.clients = clients;

            ClientComponent.render(clients);

            this.showSummary(json);
        });
    },

    showSummary({ created, updated, errors }) {
        const createdRows = created.map(this.clientToRowView).join("");
        const updatedRows = updated.map(this.clientToRowView).join("");
        const errorRows = errors.map(this.errorToRowView).join("");

        const createdTable =
            createdRows &&
            `<table class="table table-bordered">
                <caption>Creados</caption>
                <tbody>
                    ${createdRows}
                </tbody>
            </table>`;

        const updatedTable =
            updatedRows &&
            `<table class="table table-bordered">
                <caption>Editados</caption>
                <tbody>
                    ${updatedRows}
                </tbody>
            </table>`;

        const errorsTable =
            errorRows &&
            `<table class="table table-bordered">
                <caption>Errores</caption>

                <col width="5%">
                <col width="95%">

                <thead>
                    <tr>
                        <th>Indice</th>
                        <th>Errores</th>
                    </tr>
                </thead>

                <tbody>
                    ${errorRows}
                </tbody>
            </table>`;

        this.root.innerHTML = `
            <table class="table table-bordered">
                <caption>Resumen</caption>

                <col width="95%">
                <col width="5%">

                <tbody>
                    <tr>
                        <td>Creados</td>
                        <td>${created.length}</td>
                    </tr>
                    <tr>
                        <td>Editados</td>
                        <td>${updated.length}</td>
                    </tr>
                    <tr>
                        <td>Errores</td>
                        <td>${errors.length}</td>
                    </tr>
                </tbody>
            </table>

            ${createdTable}

            ${updatedTable}

            ${errorsTable}`;

        $("#summaryModal").modal();
    },

    clientToRowView(client) {
        return `<tr>
            <td>${client.fullName}</td>
        </tr>`;
    },

    errorToRowView(error) {
        return `<tr>
            <td>${error.index}</td>
            <td>${error.errors.errors.map(err => err.message).join(", ")}</td>
        </tr>`;
    },

    init() {
        this.file.addEventListener("change", this.handleChange.bind(this));
    }
};

ClientComponent.init();

FilterComponent.init();

AddClientComponent.init();

ImportComponent.init();
