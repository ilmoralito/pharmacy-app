const dictionary = {
    cash: "Contado",
    credit: "Credito"
};

const App = {
    root: document.querySelector("div#root"),

    handleChange(event) {
        const clientId = event.target.value;

        this.fetchDataset(clientId).then(json => this.render(json.dataset));
    },

    async fetchDataset(clientId) {
        const response = await fetch(
            `/pharmacyApp/notfoundproducts/client/${clientId}/dataset`
        );

        return await response.json();
    },

    render(dataset) {
        if (!dataset.length) return false;

        const rows = dataset.map(this.datasetToRow).join("");

        this.root.innerHTML = `
          <table class="table table-hover table-bordered">
            <col width="20%">
            <col width="20%">
            <col width="20%">
            <col width="40%">
            <thead>
                <th>Criterio</th>
                <th>Atendido por</th>
                <th>Tipo de compra</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>`;
    },

    datasetToRow(data) {
        return `<tr>
        <td>
          <a
            href="#"
            data-id="${data.id}"
            data-toggle="modal"
            data-target="#notfoundproduct-modal"
          >
            ${data.criteria}
          </a>
        </td>
        <td>${data.attendedBy}</td>
        <td>${dictionary[data.typeOfSale]}</td>
        <td>${data.dateCreated}</td>
      </tr>`;
    },

    init() {
        const clientDOM = document.querySelector("select#client");

        if (!clientDOM) return false;

        clientDOM.addEventListener("change", this.handleChange.bind(this));

        if (!clientDOM.value) return false;

        this.fetchDataset(clientDOM.value).then(json =>
            this.render(json.dataset)
        );
    }
};

const NotFoundProduct = {
    root: document.querySelector("div#notfoundproduct-root"),

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A") return false;

        this.fetchDataset(target.dataset.id).then(json => {
            this.render(json.notFoundProduct);
        });
    },

    async fetchDataset(id) {
        const response = await fetch(`/pharmacyApp/notfoundproducts/${id}`);

        return await response.json();
    },

    render({ client, attendedBy, criteria, typeOfSale, dateCreated }) {
        this.root.innerHTML = `
          <table class="table table-hover table-bordered">
            <col width="25%" />
            <col width="75%" />

            <tbody>
              <tr>
                <td>Cliente</td>
                <td>${client}</td>
              </tr>
              <tr>
                <td>Atenido por</td>
                <td>${attendedBy}</td>
              </tr>
              <tr>
                <td>Criterio</td>
                <td>${criteria}</td>
              </tr>
              <tr>
                <td>Tipo de venta</td>
                <td>${dictionary[typeOfSale]}</td>
              </tr>
              <tr>
                <td>Fecha de creación</td>
                <td>${dateCreated}</td>
              </tr>
            </tbody>
        </table>`;
    },

    init() {
        const trigger = document.querySelector("div#root");

        if (!trigger) return false;

        trigger.addEventListener("click", this.handleClick.bind(this));
    }
};

App.init();

NotFoundProduct.init();
