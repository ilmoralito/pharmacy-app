<div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">${title}</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="provider">Factura</label>
                    <g:textField
                        name="invoiceNumber"
                        id="invoiceNumber"
                        class="form-control"
                    />
                </div>

                <g:if test="${paymentType == 'credit'}">
                    <div class="form-group">
                        <label for="paymentDate">Fecha de pago</label>
                        <input
                            name="paymentDate"
                            id="paymentDate"
                            class="form-control"
                        />
                    </div>
                </g:if>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">Confirmar</button>
            </div>
        </div>
    </div>
</div>
