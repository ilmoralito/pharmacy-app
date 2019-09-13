const ProductsComponent = {
    products: [],

    root: document.querySelector("#products"),

    providerId: document.querySelector("#providerId").value,

    init() {
        this.root.addEventListener("click", this.handleClick.bind(this));

        this.root.addEventListener("keyup", this.handleKeyUp.bind(this));

        this.renderProviderProducts();
    },

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A") return false;

        // Add item to ItemsComponent.items
        const item = {
            id: target.dataset.productId,
            name: target.textContent,
            quantity: 0,
            purchasePrice: 0.0,
            salePrice: 0.0,
            totalBalance: 0.0,
            confirmed: false
        };

        ItemsComponent.addItem(item);

        // Sync products
        const products = [...this.products];
        const updatedProducts = products.filter(
            product => product.id !== parseInt(item.id, 10)
        );

        this.products = updatedProducts;

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

        this.render();
    },

    renderProviderProducts() {
        this.fetchProviderProducts().then(products => {
            this.products = products;

            this.render();
        });
    },

    render() {
        const products = this.products.map(this.productToRowView).join("");

        this.root.innerHTML = `
        <table class="table table-hover table-bordered">
            <caption>Productos</caption>

            <thead>
                <tr>
                    <th>
                        <input class="form-control" placeholder="Filtrar...">
                    </th>
                </tr>
            </thead>

            <tbody>
                ${products}
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
                <a href="#" data-product-id="${product.id}">${product.name}</a>
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
    },

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A" && target.nodeName !== "BUTTON")
            return false;

        if (target.textContent.trim() === "Confirmar") {
            this.handleConfirm(target, target.dataset.id);

            return false;
        }

        if (target.textContent.trim() === "Editar") {
            this.handleEdit(target, target.dataset.id);

            return false;
        }

        if (target.textContent.trim() === "Eliminar") {
            this.handleDelete(target.dataset.id);
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

        this.handleConfirm(target, target.dataset.id);
    },

    handleConfirm(target, id) {
        const item = this.getItem(id);
        const index = this.getItemIndex(id);
        const [
            ,
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            totalBalanceNode
        ] = this.getNodes(target);
        const row = target.closest("tr");

        const quantity = quantityNode.querySelector("#quantity");
        const purchasePrice = purchasePriceNode.querySelector("#purchasePrice");
        const salePrice = salePriceNode.querySelector("#salePrice");

        // set values to item
        const updatedItem = Object.assign(item, {
            quantity: quantity.value,
            purchasePrice: purchasePrice.value,
            salePrice: salePrice.value,
            totalBalance: quantity.value * purchasePrice.value,
            confirmed: true
        });

        // validate input values
        const validator = this.validate(updatedItem);

        if (!validator.ok) {
            alert(validator.message);

            return false;
        }

        // update this.items
        const items = this.items;

        items.splice(index, 1, updatedItem);

        this.items = items;

        // update total balance
        const balance = this.getBalance();

        this.root.querySelector("td#totalBalance").textContent = balance;

        // update dom
        quantityNode.innerHTML = updatedItem.quantity;
        purchasePriceNode.innerHTML = updatedItem.purchasePrice;
        salePriceNode.innerHTML = updatedItem.salePrice;
        totalBalanceNode.innerHTML = updatedItem.totalBalance;

        // set target text contet to Editar
        if (target.nodeName === "A") {
            target.textContent = "Editar";

            return;
        }

        row.querySelector("a").textContent = "Editar";
    },

    handleEdit(target, id) {
        const item = this.getItem(id);
        const [
            ,
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            totalBalanceNode
        ] = this.getNodes(target);

        quantityNode.innerHTML = `<input id="quantity" data-id="${item.id}" class="form-control" value="${item.quantity}">`;
        purchasePriceNode.innerHTML = `<input id="purchasePrice" data-id="${item.id}" class="form-control" value="${item.purchasePrice}">`;
        salePriceNode.innerHTML = `<input id="salePrice" data-id="${item.id}" class="form-control" value="${item.salePrice}">`;
        totalBalanceNode.innerHTML = item.totalBalance;

        target.textContent = "Confirmar";
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
            name: item.name
        };

        ProductsComponent.restoreProduct(dummyProduct);

        this.render();
    },

    addItem(item) {
        this.items = this.items.concat(item);

        this.render();
    },

    render() {
        if (this.items.length === 0) {
            this.root.innerHTML = "";

            return false;
        }

        const items = this.items.map(this.itemToRowView).join("");

        this.root.innerHTML = `
        <table class="table table-hover table-bordered">
            <col width="40%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />

            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio compra</th>
                    <th>Precio venta</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${items}
                <tr>
                    <td colspan="4">TOTAL</td>
                    <td id="totalBalance">${this.getBalance()}</td>
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

    getNodes(target) {
        return ([
            ,
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            totalBalanceNode
        ] = [...target.closest("tr").cells]);
    },

    getBalance() {
        const balance = this.items.reduce((accumulator, currentValue) => {
            return (accumulator += currentValue.totalBalance);
        }, 0);

        return balance;
    }
};

const OrderComponent = {
    trigger: document.querySelector(".modal-footer button"),

    invoiceNumberNode: document.querySelector(".modal-body #invoiceNumber"),

    paymentDateNode: document.querySelector(".modal-body #paymentDate"),

    order: {},

    init() {
        this.trigger.addEventListener("click", this.handleClick.bind(this));

        this.order = {
            invoiceNumber: this.invoiceNumberNode.value
        };
    },

    handleClick(event) {
        event.preventDefault();

        const validator = this.validate();

        if (!validator.ok) {
            alert(validator.message);

            return false;
        }

        this.store();
    },

    validate() {
        if (!this.invoiceNumberNode.value) {
            return { ok: false, message: "Factura es requerido" };
        }

        if (this.paymentDateNode && !this.paymentDateNode.value) {
            return { ok: false, message: "Fecha de pago es requerido" };
        }

        return { ok: true };
    },

    async store() {
        let body;

        // Improve this logic
        if (this.paymentDateNode) {
            body = {
                provider: ProductsComponent.providerId,
                invoiceNumber: this.invoiceNumberNode.value,
                paymentDate: this.paymentDateNode.value,
                items: ItemsComponent.items
            };
        } else {
            body = {
                provider: ProductsComponent.providerId,
                invoiceNumber: this.invoiceNumberNode.value,
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

        location.replace(`/pharmacyApp/orders/${json.purchaseOrder.id}`);
    }
};

OrderComponent.init();

ProductsComponent.init();

ItemsComponent.init();
