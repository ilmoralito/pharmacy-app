const ProductsComponent = {
    products: [],

    root: document.querySelector("#products"),

    providerId: document.querySelector("#providerId").value,

    init() {
        this.root.addEventListener("click", this.handleClick.bind(this));

        this.root.addEventListener("keyup", this.handleKeyUp.bind(this));

        if (!localStorage.getItem("order")) {
            this.renderProviderProducts();
        }
    },

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A") return false;

        // Add item to ItemsComponent.items
        const product = Object.assign({}, target.dataset);
        let item =
            product.instance === "medicine"
                ? {
                      quantity: 0,
                      purchasePrice: 0.0,
                      salePrice: 0.0,
                      totalBalance: 0.0,
                      bash: "",
                      confirmed: false
                  }
                : {
                      quantity: 0,
                      purchasePrice: 0.0,
                      salePrice: 0.0,
                      totalBalance: 0.0,
                      confirmed: false
                  };
        item = Object.assign({ ...product }, { ...item });

        ItemsComponent.addItem(item);

        // Sync products
        const products = [...this.products];
        const updatedProducts = products.filter(
            product => product.id !== parseInt(item.id, 10)
        );

        this.products = updatedProducts;

        OrderLocalStorageComponent.syncProducts(this.products);

        this.render();
    },

    handleKeyUp(event) {
        const products = this.filter(event.target.value);

        this.sync(products);
    },

    filter(criteria) {
        return this.products.filter(product =>
            product.name.toLowerCase().includes(criteria.toLowerCase())
        );
    },

    async fetchProviderProducts() {
        const url = `/pharmacyApp/providers/${this.providerId}/products`;
        const response = await fetch(url);

        return await response.json();
    },

    restoreProduct(dummyProduct) {
        this.products = [...this.products, dummyProduct];

        OrderLocalStorageComponent.syncProducts(this.products);

        this.render();
    },

    renderProviderProducts() {
        this.fetchProviderProducts().then(products => {
            this.products = products;

            this.render();
        });
    },

    render(products = this.products) {
        const productList = products.map(this.productToRowView).join("");

        this.root.innerHTML = `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>
                        <input class="form-control" placeholder="Filtrar productos" style="font-weight: normal;">
                    </th>
                </tr>
            </thead>

            <tbody>
                ${productList}
            </tbody>
        </table>`;
    },

    sync(products) {
        const productList = products.map(this.productToRowView).join("");

        this.root.querySelector("tbody").innerHTML = productList;
    },

    productToRowView(product) {
        return `<tr>
            <td>
                <a
                    href="#"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-instance="${product.instance}"
                >
                    ${product.name}
                </a>
            </td>
        </tr>`;
    }
};

const ItemsComponent = {
    root: document.querySelector("#items"),

    items: [],

    init() {
        this.root.addEventListener("click", this.handleClick.bind(this));

        this.root.addEventListener("keyup", this.handleKeyUp.bind(this));

        this.root.addEventListener("change", this.handleChange.bind(this));
    },

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A" && target.nodeName !== "BUTTON")
            return false;

        if (target.textContent.trim() === "Confirmar") {
            this.handleConfirm(target);

            return false;
        }

        if (target.textContent.trim() === "Editar") {
            this.handleEdit(target);

            return false;
        }

        if (target.textContent.trim() === "Eliminar") {
            this.handleDelete(target.dataset.id);

            OrderLocalStorageComponent.syncItems(this.items);

            return false;
        }

        if (target.textContent === "Continuar") {
            if (!this.allConfirmed()) {
                alert("Todo los articulos deben ser confirmados");

                return false;
            }

            $("#orderModal").modal();
        }
    },

    handleKeyUp(event) {
        const target = event.target;

        if (target.nodeName !== "INPUT") return false;

        if (event.keyCode !== 13) return false;

        this.handleConfirm(target);
    },

    handleChange(event) {
        const target = event.target;

        const item = this.getItem(target.dataset.id);

        item[target.id] = target.value;
    },

    handleConfirm(target) {
        const item = this.getItem(target.dataset.id);

        // validate input values
        const validator = this.validate(item);

        if (!validator.ok) {
            alert(validator.message);

            return false;
        }

        const itemIndex = this.getItemIndex(item.id);
        const items = this.items;

        // Set item total balance and confirmed status
        item.totalBalance = item.quantity * item.purchasePrice;
        item.confirmed = true;

        // Replace item in items
        items.splice(itemIndex, 1, item);

        // Update items list
        this.items = items;

        // Sync this.items with storage
        OrderLocalStorageComponent.syncItems(this.items);

        // Update row cells
        this.syncRowNode({ target, item });
    },

    handleEdit(target) {
        const items = this.items;
        const item = this.getItem(target.dataset.id);
        const itemIndex = this.getItemIndex(target.dataset.id);

        item.confirmed = "";

        items.splice(itemIndex, 1, item);

        this.render();
    },

    handleDelete(id) {
        const items = [...this.items];
        const item = this.getItem(id);

        if (item.confirmed) {
            if (!confirm("¿Seguro de continuar?")) return false;
        }

        const index = this.getItemIndex(id);

        items.splice(index, 1);

        // Sync items
        this.items = items;

        // Sync products
        const dummyProduct = {
            id: +item.id,
            name: item.name,
            instance: item.instance
        };

        ProductsComponent.restoreProduct(dummyProduct);

        this.render();
    },

    addItem(item) {
        this.items = this.items.concat(item);

        OrderLocalStorageComponent.syncItems(this.items);

        this.render();
    },

    render(items = this.items) {
        if (items.length === 0) {
            this.root.innerHTML = "";

            return false;
        }

        const itemList = items.map(this.itemToRowView).join("");

        this.root.innerHTML = `
        <table class="table table-hover table-bordered">
            <col width="40%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />

            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio compra</th>
                    <th>Precio venta</th>
                    <th>Vencimiento</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${itemList}
                <tr>
                    <td colspan="5">TOTAL</td>
                    <td id="totalBalance">${this.getBalance(items)}</td>
                    <td colspan="2"></td>
                </tr>
            </tbody>
        </table>

        <div class="form-group">
          <button class="btn btn-primary">Continuar</button>
        </div>`;
    },

    itemToRowView(item) {
        return `
        <tr>
            <td style="vertical-align: middle;">${item.name}</td>
            <td>
                ${
                    item.confirmed
                        ? item.quantity
                        : `<input
                      id="quantity"
                      data-id="${item.id}"
                      value="${item.quantity}"
                      class="form-control"
                    />`
                }
            </td>
            <td>
                ${
                    item.confirmed
                        ? item.purchasePrice
                        : `<input id="purchasePrice" data-id="${item.id}" value="${item.purchasePrice}" class="form-control" />`
                }
            </td>
            <td>
                ${
                    item.confirmed
                        ? item.salePrice
                        : `<input id="salePrice" data-id="${item.id}"" value="${item.salePrice}" class="form-control" />`
                }
            </td>
            <td>
                ${
                    item.confirmed
                        ? item.instance === "medicine"
                            ? item.bash
                            : ""
                        : item.instance === "medicine"
                        ? `<input type="date" id="bash" data-id="${item.id}" class="form-control" />`
                        : ""
                }
            </td>
            <td style="vertical-align: middle;">${item.totalBalance}</td>
            <td style="vertical-align: middle;" class="text-center">
                <a href="#" data-id="${item.id}">
                    ${item.confirmed ? "Editar" : "Confirmar"}
                </a>
            </td>
            <td style="vertical-align: middle;" class="text-center">
                <a href="#" data-id="${item.id}">Eliminar</a>
            </td>
        </tr>`;
    },

    validate(item) {
        let { quantity, purchasePrice, salePrice } = item;

        quantity = +quantity;
        purchasePrice = parseFloat(purchasePrice);
        salePrice = parseFloat(salePrice);

        if (isNaN(quantity) || isNaN(purchasePrice) || isNaN(salePrice)) {
            return { ok: false, message: "Tipo de dato incorrecto" };
        }

        if (quantity <= 0) {
            return { ok: false, message: "Cantidad invalida" };
        }

        if (purchasePrice <= 0) {
            return { ok: false, message: "Precio de compra es invalida" };
        }

        if (salePrice <= 0 || salePrice <= purchasePrice) {
            return { ok: false, message: "Precio de venta es invalida" };
        }

        if (item.instance === "medicine") {
            if (!item.bash) {
                return { ok: false, message: "Vencimiento es requerido" };
            }

            const today = new Date();
            const in60Days = today.addDays(60);

            if (new Date(item.bash).getTime() <= in60Days.getTime()) {
                const minDate = in60Days.toLocaleDateString({
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                return {
                    ok: false,
                    message: `Vencimiento invalido. ${minDate}`
                };
            }
        }

        return { ok: true };
    },

    allConfirmed() {
        return this.items.every(item => item.confirmed);
    },

    getItemIndex(id) {
        return this.items.findIndex(item => item.id === id);
    },

    getItem(id) {
        return this.items.find(item => item.id === id);
    },

    syncRowNode({ target, item }) {
        const row = target.closest("tr");

        if (item.instance === "medicine") {
            const [
                ,
                quantityNode,
                purchasePriceNode,
                salePriceNode,
                bashNode,
                totalBalanceNode
            ] = row.cells;

            quantityNode.textContent = item.quantity;
            purchasePriceNode.textContent = item.purchasePrice;
            salePriceNode.textContent = item.salePrice;
            bashNode.textContent = item.bash;
            totalBalanceNode.textContent = item.quantity * item.purchasePrice;
        } else {
            const [
                ,
                quantityNode,
                purchasePriceNode,
                salePriceNode,
                ,
                totalBalanceNode
            ] = row.cells;

            quantityNode.textContent = item.quantity;
            purchasePriceNode.textContent = item.purchasePrice;
            salePriceNode.textContent = item.salePrice;
            totalBalanceNode.textContent = item.quantity * item.purchasePrice;
        }

        this.root.querySelector(
            "td#totalBalance"
        ).textContent = this.getBalance();

        if (target.nodeName === "A") {
            target.textContent = "Editar";

            return false;
        }

        row.querySelector("a").textContent = "Editar";
    },

    getNodes(target) {
        return ([
            ,
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            totalBalanceNode
        ] = [...target.closest("tr").cells]);
    },

    getMedicineNodes(target) {
        return ([
            ,
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            bashNode,
            totalBalanceNode
        ] = [...target.closest("tr").cells]);
    },

    getBalance(items = this.items) {
        const balance = items.reduce((accumulator, currentValue) => {
            return (accumulator += currentValue.totalBalance);
        }, 0);

        return balance;
    }
};

const OrderComponent = {
    order: {
        invoiceNumber: "",
        paymentDate: ""
    },

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "BUTTON") {
            return false;
        }

        const validator = this.validate();

        if (!validator.ok) {
            alert(validator.message);

            return false;
        }

        this.store();
    },

    handleChange(event) {
        const target = event.target;

        if (target.nodeName !== "INPUT") {
            return false;
        }

        this.order[target.name] = target.value;
    },

    validate() {
        const { invoiceNumber, paymentDate } = this.order;

        if (!invoiceNumber) {
            return { ok: false, message: "Factura es requerido" };
        }

        if (!Number.isInteger(parseInt(invoiceNumber, 10))) {
            return { ok: false, message: "Factura es invalida" };
        }

        if (OrderHelper.getOrder().paymentType === "credit") {
            if (!paymentDate) {
                return { ok: false, message: "Fecha de pago es requerido" };
            }

            if (paymentDate.length !== 10 && isNaN(Date.parse(paymentDate))) {
                return { ok: false, message: "Fecha de pago es invalida" };
            }

            if (new Date(paymentDate).getTime() <= new Date().getTime()) {
                return {
                    ok: false,
                    message: "Fecha de pago debe ser mayor a hoy"
                };
            }
        }

        return { ok: true };
    },

    async store() {
        let body;
        const { providerId, paymentType } = OrderHelper.getOrder();
        const { invoiceNumber, paymentDate } = this.order;

        if (paymentType === "credit") {
            body = {
                provider: providerId,
                invoiceNumber: invoiceNumber,
                paymentDate: paymentDate,
                items: ItemsComponent.items
            };
        } else {
            body = {
                provider: providerId,
                invoiceNumber: invoiceNumber,
                items: ItemsComponent.items
            };
        }

        const response = await fetch("/pharmacyApp/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ order: body })
        });

        const json = await response.json();

        if (!json.ok) {
            const errors = json.errors.errors
                .map(error => error.message)
                .join("\n");

            alert(errors);
        }

        OrderLocalStorageComponent.clearLocalStorage();

        location.replace(`/pharmacyApp/orders/${json.purchaseOrder.id}`);
    },

    init() {
        const orderModal = document.querySelector("div#orderModal");

        orderModal.addEventListener("click", this.handleClick.bind(this));

        orderModal.addEventListener("change", this.handleChange.bind(this));
    }
};

const OrderLocalStorageComponent = {
    _order: {},

    _items: [],

    _products: [],

    _syncLocalStorage() {
        const state = {
            order: this._order,
            items: this._items,
            products: this._products
        };

        localStorage.setItem("order", JSON.stringify(state));
    },

    syncItems(items) {
        this._items = items;

        this._syncLocalStorage();
    },

    syncProducts(products) {
        this._products = products;

        this._syncLocalStorage();
    },

    clearLocalStorage() {
        localStorage.removeItem("order");
    },

    init() {
        this._order = OrderHelper.getOrder();

        if (!localStorage.getItem("order")) return false;

        const { order, products, items } = JSON.parse(
            localStorage.getItem("order")
        );

        if (
            order.providerId !== this._order.providerId ||
            order.paymentType !== this._order.paymentType
        ) {
            this.clearLocalStorage();

            return false;
        }

        if (!confirm("¿Desea cargar desde los datos respaldados?")) {
            this.clearLocalStorage();

            return false;
        }

        ProductsComponent.products = products;
        ProductsComponent.render(products);

        ItemsComponent.items = items;
        ItemsComponent.render(items);

        this._products = products;
        this._items = items;
    }
};

const OrderDetailComponent = {
    _root: document.querySelector("div#order-detail"),

    _order: {},

    _dictionary: {
        cash: "Contado",
        credit: "Credito"
    },

    async _fetchProviderName() {
        const endpoint = `/pharmacyApp/providers/${this._order.providerId}`;
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });

        return await response.json();
    },

    _render({ provider }) {
        const name = provider.name;
        const paymentType = this._dictionary[this._order.paymentType];
        const output = `Proveedor: ${name}, Tipo de pago: ${paymentType}`;

        this._root.innerHTML = `
            <div class="row">
                <div class="col-md-3 col-md-offset-9">
                    <div class="text-center" style="border: 1px solid #ddd; padding: 10px;">
                        ${output}
                    </div">
                </div>
            </div>`;
    },

    init() {
        this._order = OrderHelper.getOrder();

        this._fetchProviderName().then(provider => this._render({ provider }));
    }
};

const OrderHelper = {
    _order: {
        providerId: "",
        paymentType: ""
    },

    getOrder() {
        return this._order;
    },

    init() {
        const [, , , providerId, , paymentType] = location.pathname
            .split("/")
            .filter(token => token);

        this._order.providerId = providerId;
        this._order.paymentType = paymentType;
    }
};

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());

    date.setDate(date.getDate() + days);

    return date;
};

OrderHelper.init();

OrderDetailComponent.init();

OrderLocalStorageComponent.init();

ProductsComponent.init();

OrderComponent.init();

ItemsComponent.init();
