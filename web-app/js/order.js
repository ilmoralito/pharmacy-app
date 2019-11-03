// TODO: All this is too complex, we must redo this logic

const Action = {
    approveButton: document.querySelector("a.approveButton"),

    cancelButton: document.querySelector("a.cancelButton"),

    enableApproveButton() {
        this.approveButton.removeAttribute("disabled");
    },

    disableApproveButton() {
        this.approveButton.setAttribute("disabled", "disabled");
    },

    enableCancelButton() {
        this.cancelButton.removeAttribute("disabled");
    },

    disableCancelButton() {
        this.cancelButton.setAttribute("disabled", "disabled");
    },

    isApproveButtonDisabled() {
        return this.approveButton.hasAttribute("disabled");
    },

    isCancelButtonDisabled() {
        return this.cancelButton.hasAttribute("disabled");
    }
};

const BalanceComponent = {
    balanceNode: document.querySelector("td#totalBalance"),

    increaseBalance(balance) {
        const currentBalance = this.getCurrentBalance();

        this.balanceNode.textContent = currentBalance + +balance;
    },

    decreaseBalance(balance) {
        const currentBalance = this.getCurrentBalance();

        this.balanceNode.textContent = currentBalance - +balance;
    },

    updateBalance() {
        const currentBalance = Item.getCurrentBalance();

        this.balanceNode.textContent = currentBalance;
    },

    getCurrentBalance() {
        return +this.balanceNode.textContent;
    }
};

const Helper = {
    getNode(target) {
        const row = target.closest("tr");
        const [, node] = Array.from(row.cells);

        return node;
    }
};

const Order = {
    root: document.querySelector("table#order"),

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A") return false;

        const { orderId: id, field } = Object.assign({}, target.dataset);

        if (target.textContent === "Editar") {
            const node = Helper.getNode(target);

            node.innerHTML = `<input class="form-control" value="${node.textContent.trim()}">`;

            target.textContent = "Confirmar";

            return false;
        }

        if (target.textContent === "Confirmar") {
            const node = Helper.getNode(target);
            const value = node.querySelector("input").value;

            this.confirm({ id, [field]: value }).then(json => {
                if (!json.ok) {
                    alert(
                        json.errors.errors
                            .map(error => error.message)
                            .join("\n")
                    );

                    return false;
                }

                node.innerHTML =
                    field === "paymentDate"
                        ? json.purchaseOrder[field].split("T")[0]
                        : json.purchaseOrder[field];

                target.textContent = "Editar";
            });
        }
    },

    async confirm(object) {
        const response = await fetch(`/pharmacyApp/orders/${object.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(object)
        });

        return await response.json();
    },

    init() {
        this.root.addEventListener("click", this.handleClick.bind(this));
    }
};

const AddItem = {
    form: document.forms.addItemForm,

    table: document.querySelector("table#items"),

    itemNode: document.querySelector('select[name="item"]'),

    trigger: document.querySelector('a[data-target="#addItemModal"]'),

    providerItems: [],

    handleClick(event) {
        event.preventDefault();

        // reset form
        this.form.reset();

        // Set item select options
        this.setProducts();

        // enable action buttons if required
        if (Action.isApproveButtonDisabled()) {
            Action.enableApproveButton();
        }

        if (Action.cancelButton && Action.isCancelButtonDisabled()) {
            Action.enableCancelButton();
        }
    },

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(this.form);

        fetch(`/pharmacyApp/items`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(json => {
                if (!json.ok) {
                    const message = json.errors.errors
                        .map(error => error.message)
                        .join("\n");

                    alert(message);

                    return false;
                }

                this.setProducts();

                this.form.reset();

                if (!Item.root) {
                    location.reload();

                    return false;
                }

                BalanceComponent.increaseBalance(json.item.totalBalance);

                this.render(json.item);
            })
            .catch(error => console.error(error.message));
    },

    handleChangeItem(event) {
        const target = event.target;
        const item = this.providerItems.find(item => item.id === +target.value);
        const bashGroup = document.querySelector("div#bash-group");

        if (item.instance !== "medicine") {
            bashGroup.classList.add("hide");

            return false;
        }

        bashGroup.classList.remove("hide");
    },

    render(item) {
        const row = document.createElement("tr");
        const productCell = document.createElement("td");
        const quantityCell = document.createElement("td");
        const purchasePriceCell = document.createElement("td");
        const salePriceCell = document.createElement("td");
        const bashCell = document.createElement("td");
        const balanceCell = document.createElement("td");
        const editCell = document.createElement("td");
        const deleteCell = document.createElement("td");
        const editLink = document.createElement("a");
        const deleteLink = document.createElement("a");

        productCell.innerHTML = item.product.name;
        quantityCell.innerHTML = item.quantity;
        purchasePriceCell.innerHTML = item.purchasePrice;
        salePriceCell.innerHTML = item.salePrice;
        bashCell.innerHTML = item.bash ? item.bash : "";

        balanceCell.style = "vertical-align: middle;";
        balanceCell.innerHTML = item.totalBalance;

        editLink.textContent = "Editar";
        editLink.setAttribute("href", "#");
        editLink.setAttribute("data-item-id", item.id);
        editLink.setAttribute("data-order-id", item.purchaseOrder.id);

        editCell.style = "vertical-align: middle;";
        editCell.classList.add("text-center");
        editCell.appendChild(editLink);

        deleteLink.textContent = "Eliminar";
        deleteLink.setAttribute("href", "#");
        deleteLink.setAttribute("data-item-id", item.id);
        deleteLink.setAttribute("data-item-balance", item.totalBalance);
        deleteLink.setAttribute("data-order-id", item.purchaseOrder.id);

        deleteCell.style = "vertical-align: middle;";
        deleteCell.classList.add("text-center");
        deleteCell.appendChild(deleteLink);

        row.appendChild(productCell);
        row.appendChild(quantityCell);
        row.appendChild(purchasePriceCell);
        row.appendChild(salePriceCell);
        row.appendChild(bashCell);
        row.appendChild(balanceCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);

        this.table.tBodies[0].appendChild(row);
    },

    setProducts() {
        this.itemNode.innerHTML = "";

        this.fetchOrderItems().then(json => {
            const items = this.providerItems
                .filter(item => {
                    const index = json.items.findIndex(
                        element => item.id === element.product.id
                    );

                    return index < 0;
                })
                .sort((a, b) => (a.name > b.name ? 1 : -1));

            const options = items.map(item => new Option(item.name, item.id));

            options.forEach(option => this.itemNode.appendChild(option));
        });
    },

    async fetchOrderItems() {
        const id = this.form.elements.id.value;
        const response = await fetch(`/pharmacyApp/orders/${id}/items`);

        return await response.json();
    },

    async fetchProviderItems() {
        const id = this.form.elements.providerId.value;
        const response = await fetch(`/pharmacyApp/providers/${id}/products`);

        return await response.json();
    },

    init() {
        if (!this.form) return false;

        this.fetchProviderItems().then(items => {
            this.providerItems = items;

            this.itemNode.addEventListener(
                "change",
                this.handleChangeItem.bind(this)
            );
        });

        this.trigger.addEventListener("click", this.handleClick.bind(this));

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }
};

const Item = {
    root: document.querySelector("table#items"),

    handleClick(event) {
        event.preventDefault();

        const target = event.target;

        if (target.nodeName !== "A") return false;

        const { itemId, itemBalance, orderId, orderInstance } = Object.assign(
            {},
            target.dataset
        );

        if (target.textContent.trim() === "Editar") {
            const [
                quantityNode,
                purchasePriceNode,
                salePriceNode,
                bashNode
            ] = this.getNodes(target);

            quantityNode.innerHTML = `<input value="${quantityNode.textContent.trim()}" class="form-control" />`;
            purchasePriceNode.innerHTML = `<input value="${purchasePriceNode.textContent.trim()}" class="form-control" />`;
            salePriceNode.innerHTML = `<input value="${salePriceNode.textContent.trim()}" class="form-control" />`;

            if (bashNode.textContent.trim()) {
                bashNode.innerHTML = `<input type="date" value="${bashNode.textContent.trim()}" class="form-control" />`;
            }

            target.textContent = "Confirmar";

            return false;
        }

        if (target.textContent.trim() === "Confirmar") {
            const [
                quantity,
                purchasePrice,
                salePrice,
                bash
            ] = this.getInputsValue(target);

            this.update({
                id: itemId,
                quantity,
                purchasePrice,
                salePrice,
                bash
            }).then(item => {
                const [
                    quantityNode,
                    purchasePriceNode,
                    salePriceNode,
                    bashNode,
                    balanceNode
                ] = this.getNodes(target);

                quantityNode.innerHTML = item.quantity;
                purchasePriceNode.innerHTML = item.purchasePrice;
                salePriceNode.innerHTML = item.salePrice;
                bashNode.innerHTML = item.bash ? item.bash : "";
                balanceNode.innerHTML = item.totalBalance;

                BalanceComponent.updateBalance();

                target.textContent = "Editar";
            });

            return false;
        }

        if (target.textContent.trim() === "Eliminar") {
            if (!confirm("¿Seguro de continuar?")) return false;

            this.remove({ itemId, orderId }).then(json => {
                if (!json.ok) {
                    alert(json.message);

                    return false;
                }

                BalanceComponent.decreaseBalance(itemBalance);

                target.closest("tr").remove();

                if (!this.areThereItems()) {
                    Action.disableApproveButton();

                    if (Action.cancelButton) {
                        Action.disableCancelButton();
                    }
                }
            });
        }
    },

    async update({ id, quantity, purchasePrice, salePrice, bash }) {
        const body =
            bash === undefined
                ? { quantity, purchasePrice, salePrice }
                : { quantity, purchasePrice, salePrice, bash };
        const response = await fetch(`/pharmacyApp/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        const json = await response.json();

        if (!json.ok) {
            alert(json.errors.errors.map(error => error.message)).join("\n");

            return false;
        }

        return json.item;
    },

    async remove({ itemId, orderId }) {
        const response = await fetch(
            `/pharmacyApp/items/${itemId}/in/order/${orderId}/delete`
        );

        return await response.json();
    },

    getCurrentBalance() {
        const nodes = Array.from(document.querySelectorAll("td.balance"));

        const balance = nodes
            .map(node => +node.textContent.trim())
            .reduce((accumulator, currentValue) => accumulator + currentValue);

        return balance;
    },

    getNodes(target) {
        const row = target.closest("tr");
        const [
            ,
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            bashNode,
            balanceNode
        ] = Array.from(row.cells);

        return [
            quantityNode,
            purchasePriceNode,
            salePriceNode,
            bashNode,
            balanceNode
        ];
    },

    getInputsValue(target) {
        const nodes = this.getNodes(target);

        return nodes
            .map(node => {
                const input = node.querySelector("input");

                if (input) return node.querySelector("input").value;
            })
            .filter(node => node);
    },

    areThereItems() {
        return this.root.tBodies[0].rows.length > 0;
    },

    init() {
        if (this.root) {
            this.root.addEventListener("click", this.handleClick.bind(this));
        }
    }
};

AddItem.init();

Order.init();

Item.init();
