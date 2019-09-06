const NewSaleComponent = {
  typeOfSale: "",

  clientId: "",

  setTypeOfSale(typeOfSale) {
    this.typeOfSale = typeOfSale;
  },

  setClientId(clientId) {
    this.clientId = clientId;
  },

  init() {
    this.setSaleDataset();
  },

  setSaleDataset() {
    const [typeOfSale, clientId] = location.pathname
      .split("/")
      .filter(Boolean)
      .slice(3);

    this.setTypeOfSale(typeOfSale);
    this.setClientId(clientId);
  }
};

const SaleModalComponent = {
  init() {
    const modalBody = document.querySelector("#saleModal .modal-body");

    const typeOfSale = modalBody.querySelector("#typeOfSale");
    const client = modalBody.querySelector("#client");

    typeOfSale.value = NewSaleComponent.typeOfSale;
    client.value = NewSaleComponent.clientId;
  }
};

const InventoryComponent = {
  root: document.querySelector("#inventory"),

  inventory: [],

  async fetchInventory() {
    const response = await fetch("/pharmacyApp/inventory", {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    });

    return await response.json();
  },

  render() {
    const rows = this.inventory.map(this.itemToRow).join("");

    this.root.innerHTML = `<table class="table table-hover">
      <tbody>${rows}</tbody>
    </table>`;
  },

  itemToRow(item) {
    return `<tr>
      <td>
        <a
          href="#"
          data-product-id="${item.product.id}"
          data-product-name="${item.product.name}"
          data-stock="${item.stock}"
          data-quantity="1"
          data-sale-price="${item.salePrice}"
          data-total=${item.salePrice}
        >
          ${item.product.name}
        </a>
      </td>
    </tr>`;
  },

  handleClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== "A") return false;

    const item = Object.assign({}, event.target.dataset);

    SaleDetailComponent.setSaleDetail(item);
  },

  init() {
    this.fetchInventory()
      .then(inventry => {
        this.inventory = this.inventory.concat(inventry);

        this.render();
      })
      .catch(error => console.error(error.message));

    this.root.addEventListener("click", this.handleClick.bind(this));
  }
};

const SaleDetailComponent = {
  saleDetail: [],

  root: document.querySelector("#salesDetail"),

  setSaleDetail(item) {
    this.saleDetail = this.saleDetail.concat(item);

    this.render();
  },

  render() {
    if (this.saleDetail.length === 0) {
      this.root.innerHTML = "";

      return false;
    }

    const rows = this.saleDetail.map(this.itemToRow).join("");

    this.root.innerHTML = `<table class="table table-hover table-bordered">
      <col width="60%" />
      <col width="10%" />
      <col width="10%" />
      <col width="10%" />
      <col width="10%" />

      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        ${rows}
      </tbody>
    </table>

    <button class="btn btn-primary" data-toggle="modal" data-target="#mySale">Continuar</button>`;
  },

  itemToRow(item) {
    return `<tr>
      <td style="vertical-align: middle;">${item.productName}</td>
      <td style="vertical-align: middle;">${item.salePrice}</td>
      <td>
        <input
          type="number"
          min="1"
          max="${item.stock}"
          value="${item.quantity}"
          data-product-id="${item.productId}"
          class="form-control"
        />
      </td>
      <td style="vertical-align: middle;">${item.total}</td>
      <td class="text-center">
        <button class="btn btn-default" data-id="${item.productId}">Eliminar</button>
      </td>
    </tr>`;
  },

  handleClick(event) {
    event.preventDefault();

    const target = event.target;

    if (target.nodeName !== "BUTTON") return false;

    if (target.textContent === "Eliminar") {
      this.removeItem(target.dataset.id);
    }

    if (target.textContent === "Continuar") {
      SalesSummaryComponent.handler();
    }
  },

  removeItem(productId) {
    const saleDetail = [...this.saleDetail];
    const index = this.saleDetail.findIndex(
      item => item.productId === productId
    );

    saleDetail.splice(index, 1);

    this.saleDetail = saleDetail;

    this.render();
  },

  handleInput(event) {
    const target = event.target;
    const saleDetail = [...this.saleDetail];
    const productId = target.dataset.productId;
    const item = this.saleDetail.find(item => item.productId === productId);
    const index = this.saleDetail.findIndex(
      item => item.productId === productId
    );
    const newItem = Object.assign({}, item, {
      quantity: target.value,
      total: target.value * item.salePrice
    });

    saleDetail.splice(index, 1, newItem);

    this.saleDetail = saleDetail;

    this.render();
  },

  getTotalToPay() {
    return this.saleDetail.reduce((accumulator, currentValue) => {
      accumulator += +currentValue.total;

      return accumulator;
    }, 0);
  },

  init() {
    this.root.addEventListener("click", this.handleClick.bind(this));

    this.root.addEventListener("input", this.handleInput.bind(this));
  }
};

const SalesSummaryComponent = {
  root: document.querySelector("div#mySale #root"),

  totalToPay: 0,

  moneyReceived: 0,

  subtotal: 0,

  change: 0,

  setTotalToPay() {
    const totalToPay = SaleDetailComponent.getTotalToPay();

    this.totalToPay = totalToPay;
  },

  setSubtotal() {
    const subtotal = this.totalToPay - this.totalToPay * 0.15;

    this.subtotal = subtotal;
  },

  setMoneyReceived(moneyReceived) {
    this.moneyReceived = moneyReceived;
  },

  setChange(moneyReceived) {
    this.change = moneyReceived - this.totalToPay;

    document.querySelector("#change").innerHTML = this.change; // I realy do not like this solution. Could it be done with a proxy?
  },

  renderCreditSummary() {
    this.root.innerHTML = `<table class="table table-hover table-bordered">
      <tbody>
        <tr>
          <td>IVA</td>
          <td>15%</td>
        </tr>
        <tr>
          <td>SUBTOTAL</td>
          <td>${this.subtotal}</td>
        </tr>
        <tr>
          <td>TOTAL A PAGAR</td>
          <td>${this.totalToPay}</td>
        </tr>
      </tbody>
    </table>`;
  },

  renderCashSummary() {
    this.root.innerHTML = `<table class="table table-hover table-bordered">
      <tbody>
        <tr>
          <td>IVA</td>
          <td>15%</td>
        </tr>
        <tr>
          <td>SUBTOTAL</td>
          <td>${this.subtotal}</td>
        </tr>
        <tr>
          <td>TOTAL A PAGAR</td>
          <td>${this.totalToPay}</td>
        </tr>
        <tr>
          <td style="vertical-align: middle;">EFECTIVO RECIBIDO</td>
          <td>
            <input class="form-control" />
          </td>
        </tr>
        <tr>
          <td>VUELTO</td>
          <td id="change"></td>
        </tr>
      </tbody>
    </table>`;
  },

  handleKeyUp(event) {
    const target = event.target;

    this.setChange(+target.value);

    this.setMoneyReceived(+target.value);
  },

  handleClick(event) {
    event.preventDefault();

    const target = event.target;

    if (target.nodeName !== "BUTTON") return false;

    if (NewSaleComponent.typeOfSale === "cash") {
      const validator = this.validate();

      if (!validator.ok) {
        alert(validator.message);

        return;
      }

      StoreSaleComponent.storeCashSale();

      return false;
    }

    StoreSaleComponent.storeCreditSale();
  },

  validate() {
    if (isNaN(this.totalToPay) || this.totalToPay <= 0) {
      return { ok: false, message: "Total a pagar es invalido" };
    }

    if (isNaN(this.subtotal) || this.subtotal <= 0) {
      return { ok: false, message: "Sub total es invalido" };
    }

    if (isNaN(this.change) || this.change < 0) {
      return { ok: false, message: "Vuelto es invalido" };
    }

    return { ok: true };
  },

  handler() {
    this.setTotalToPay();

    this.setSubtotal();

    const typeOfSale = NewSaleComponent.typeOfSale;

    if (typeOfSale === "credit") {
      this.renderCreditSummary();
    }

    if (typeOfSale === "cash") {
      this.renderCashSummary();
    }
  },

  init() {
    this.root.addEventListener("keyup", this.handleKeyUp.bind(this));

    document
      .querySelector("#mySale .modal-footer button")
      .addEventListener("click", this.handleClick.bind(this));
  }
};

const StoreSaleComponent = {
  storeCashSale() {
    const { typeOfSale: paymentType, clientId: client } = NewSaleComponent;
    const { saleDetail: salesDetail } = SaleDetailComponent;
    const {
      totalToPay,
      moneyReceived: cashReceived,
      change
    } = SalesSummaryComponent;

    const sale = Object.assign(
      {},
      { paymentType, client },
      { salesDetail },
      { totalToPay, cashReceived, change }
    );

    this.store(sale);
  },

  storeCreditSale() {
    const { typeOfSale: paymentType, clientId: client } = NewSaleComponent;
    const { saleDetail: salesDetail } = SaleDetailComponent;

    const sale = Object.assign({}, { paymentType, client }, { salesDetail });

    this.store(sale);
  },

  store(sale) {
    fetch("/pharmacyApp/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(sale)
    })
      .then(response => response.json())
      .then(json => {
        if (!json.ok) {
          alert(json.errors.errors.map(error => error.message).join("\n"));

          return false;
        }

        location.replace("/pharmacyApp/sales");
      })
      .catch(error => console.error(error.message));
  }
};

NewSaleComponent.init();

SaleModalComponent.init();

InventoryComponent.init();

SaleDetailComponent.init();

SalesSummaryComponent.init();
