<div class="form-group">
    <label for="provider">Proveedor</label>
    <g:select
        name="provider"
        from="${orderForm.providers}"
        optionKey="id"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="type">Tipo de compra</label>
    <g:select
        name="type"
        from="['Contado', 'Credito']"
        keys="['cash payment', 'credit payment']"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="invoiceNumber">Factura</label>
    <g:textField name="invoiceNumber" class="form-control" />
</div>

<div class="form-group">
    <label for="paymentDate">Fecha de pago</label>
    <g:textField
        name="paymentDate"
        class="datepicker-here form-control" />
</div>
