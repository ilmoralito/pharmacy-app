const dictionary = {
    cash: "Contado",
    credit: "Credito"
};

const App = {
    root: document.querySelector("div#root"),

    handleChange(event) {
        const clientId = event.target.value;

        if (!clientId) return false;

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

        this.root.innerHTML = `<table class="table table-hover table-bordered">
        <col width="20%">
        <col width="20%">
        <col width="20%">
        <col width="40%">
        <thead>
          <t>
            <th>Fecha</th>
            <th>Atendido por</th>
            <th>Tipo de compra</th>
            <th>Criterio</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>`;
    },

    datasetToRow(data) {
        return `<tr>
        <td>${data.dateCreated}</td>
        <td>${data.attendedBy}</td>
        <td>${dictionary[data.typeOfSale]}</td>
        <td>${data.criteria}</td>
      </tr>`;
    },

    init() {
        document
            .querySelector("select#client")
            .addEventListener("change", this.handleChange.bind(this));
    }
};

App.init();
