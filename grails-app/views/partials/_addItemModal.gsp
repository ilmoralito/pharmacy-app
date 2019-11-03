<div
  class="modal fade"
  id="addItemModal"
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
        <h4 class="modal-title" id="myModalLabel">Agregar artículo</h4>
      </div>
      <div class="modal-body">
        <form name="addItemForm" autocomplete="off">
          <input type="hidden" name="id" value="${order?.id}" />
          <input type="hidden" name="providerId" value="${order?.provider?.id}" />

          <div class="form-group">
            <label for="item">Articulo</label>
            <select name="item" class="form-control"></select>
          </div>

          <div class="form-group">
            <label for="quantity">Cantidad</label>
            <input name="quantity" class="form-control" />
          </div>

          <div class="form-group">
            <label for="purchasePrice">Precio de compra</label>
            <input name="purchasePrice" class="form-control" />
          </div>

          <div class="form-group">
            <label for="salePrice">Precio de venta</label>
            <input name="salePrice" class="form-control" />
          </div>

          <div id="bash-group" class="form-group hide">
            <label for="bash">Vencimiento</label>
            <input type="date" name="bash" class="form-control" />
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">Agregar</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
      </div>
    </div>
  </div>
</div>
