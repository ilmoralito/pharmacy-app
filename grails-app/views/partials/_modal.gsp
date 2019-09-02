<div
  class="modal fade"
  id="providersModal"
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
          <label for="provider">Proveedor</label>
          <g:select
            name="provider"
            from="${providers}"
            noSelection="['': 'Selecciona uno']"
            optionKey="id"
            optionValue="name"
            class="form-control"
          />
          <span id="helpBlock" class="help-block">Lista proveedores con algun producto</span>
        </div>

        <div class="form-group">
          <label for="paymentType">Tipo de pago</label>
          <g:select
            name="paymentType"
            from="['Credito', 'Contado']"
            noSelection="['': 'Selecciona uno']"
            keys="['credit', 'cash']"
            class="form-control"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div>
