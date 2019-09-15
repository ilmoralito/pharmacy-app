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

ClientComponent.init();

FilterComponent.init();

AddClientComponent.init();
