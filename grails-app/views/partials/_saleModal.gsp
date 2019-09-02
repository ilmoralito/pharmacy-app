<div
  class="modal fade"
  id="saleModal"
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
          <label for="provider">Tipo de venta</label>
          <g:select
            name="typeOfSale"
            from="['Contado', 'Credito']"
            noSelection="['': 'Selecciona uno']"
            keys="['cash', 'credit']"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="client">Cliente</label>
          <g:select
            name="client"
            from="${clients}"
            noSelection="['': 'Selecciona uno']"
            optionKey="id"
            optionValue="${fullName}"
            class="form-control"
          />

          <span id="helpBlock" class="help-block">
            <a href="#">Crea cliente</a>
          </span>
        </div>

        <div id="root" class="hide">
          <form name="form" autocomplete="off">
            <g:render template="/client/form" />

            <div class="form-group">
              <button type="submit" class="btn btn-primary">Confirmar</button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Confirmar</button>
      </div>
    </div>
  </div>
</div>
