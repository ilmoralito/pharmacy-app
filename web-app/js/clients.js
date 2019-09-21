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
            alert("Archvio invalido. Selecciona un archico con de tipo CSV");

            return false;
        }

        const fileReader = new FileReader();

        fileReader.onload = result => {
            const clients = result.target.result
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

            this.store(clients);
        };

        fileReader.readAsText(file);
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

        this.render(clients, json);
    },

    render(clients, json) {
        ClientComponent.fetchClients().then(clientList => {
            const clientsLength = json.created.length + json.updated.length;
            if (clientList.length === clientsLength) {
                location.reload();

                return false;
            }

            ClientComponent.clients = clientList;

            ClientComponent.render(clientList);

            this.showSummary(json);
        });
    },

    showSummary(json) {
        const createdRows = json.created.map(this.clientToRowView).join("");
        const updatedRows = json.updated.map(this.clientToRowView).join("");
        const errorRows = json.errors.map(this.errorToRowView).join("");

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
                        <td>${json.created.length}</td>
                    </tr>
                    <tr>
                        <td>Editados</td>
                        <td>${json.updated.length}</td>
                    </tr>
                    <tr>
                        <td>Errores</td>
                        <td>${json.errors.length}</td>
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
            <td>${error.errors.map(err => err.message).join("<br>")}</td>
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
