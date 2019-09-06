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
        <h4 class="modal-title">Anular</h4>
      </div>

      <div class="modal-body">
        <g:form name="cancellationForm">
          <g:hiddenField name="id" value="${sale.id}" />

          <div class="form-group">
            <label for="reasonForCancellation">Motivo anulación</label>
            <g:textArea name="reasonForCancellation" class="form-control" />
          </div>
        </g:form>
      </div>

      <div class="modal-footer">
        <button type="submit" form="cancellationForm" class="btn btn-primary">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</div>
