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
                <h4 class="modal-title">Continuar</h4>
            </div>

            <div class="modal-body">
                <div class="form-group">
                    <label for="paymentType">Tipo de venta</label>
                    <select name="paymentType" id="paymentType" class="form-control">
                        <option value="cash payment">Contado</option>
                        <option value="credit payment">Credito</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="client">Cliente</label>
                    <select name="client" id="client" class="form-control"></select>
                </div>

                <button id="toggleForm" class="btn btn-default btn-xs">Agregar cliente</button>

                <form name="form" class="hide" style="margin-top: 10px;" autocomplete="off">
                    <g:render template="/client/form" />

                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</div>
