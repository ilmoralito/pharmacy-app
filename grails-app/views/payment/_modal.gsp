<div id="myModal" class="modal fade" tabindex="-1" role="dialog">
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
                <h4 class="modal-title">Abonar</h4>
            </div>

            <div class="modal-body">
                <g:form name="paymentForm" autocomplete="off">
                    <g:hiddenField name="id" value="${sale.id}" />

                    <div class="form-group">
                        <label for="amountPaid">Monto a abonar</label>
                        <g:textField name="amountPaid" class="form-control" />
                    </div>
                </g:form>
            </div>

            <div class="modal-footer">
                <button type="submit" form="paymentForm" class="btn btn-primary">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</div>
