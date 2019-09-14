const FilterOrdersComponent = {
  root: document.querySelector("tbody"),

  providers: [],

  init() {
    const filterNode = document.querySelector("#filter");

    filterNode.addEventListener("input", this.handleInput.bind(this));

    this.fetchDataFromDOM();
  },

  handleInput(event) {
    const value = event.target.value;
    const providers = [...this.providers];

    const output = providers.filter(provider => {
      let { name, type, invoice } = provider;

      name = name.toLowerCase();
      type = type.toLowerCase();
      invoice = invoice.toLowerCase();

      return (
        name.includes(value) || type.includes(value) || invoice.includes(value)
      );
    });

    this.render(output);
  },

  render(providers) {
    const rows = providers.map(this.providerToRowView).join("");

    this.root.innerHTML = rows;
  },

  fetchDataFromDOM() {
    const rows = [...this.root.rows];
    const dataset = rows.map(row => {
      const [
        nameNode,
        approvedNode,
        typeNode,
        invoiceNode,
        paymentDateNode,
        balanceToPayNode,
        canceledNode,
        idNode
      ] = [...row.cells];

      return {
        name: nameNode.textContent,
        approved: approvedNode.textContent,
        type: typeNode.textContent.replace(/\n/g, "").trim(),
        invoice: invoiceNode.textContent,
        paymentDate: paymentDateNode.textContent.replace(/\n/g, "").trim(),
        balanceToPay: balanceToPayNode.textContent.replace(/\n/g, "").trim(),
        canceled: canceledNode.textContent.replace(/\n/g, "").trim(),
        id: idNode.dataset.id
      };
    });

    this.providers = this.providers.concat(dataset);
  },

  providerToRowView(provider) {
    return `
        <tr>
          <td>${provider.name}</td>
          <td>${provider.approved}</td>
          <td>${provider.type}</td>
          <td>${provider.invoice}</td>
          <td>${provider.paymentDate}</td>
          <td>${provider.balanceToPay}</td>
          <td>${provider.canceled}</td>
          <td class="text-center">
            <a href="/pharmacyApp/orders/${provider.id}" data-id="${provider.id}">Ver</a>
          </td>
        </tr>
      `;
  }
};

FilterOrdersComponent.init();
