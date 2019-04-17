<div class="form-group">
    <label for="presentation">Presentacion</label>
    <g:select
        name="presentation"
        from="${measurePresentationForm.presentations}"
        optionKey="id"
        optionValue="name"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="measure">Medida</label>
    <g:select
        name="measure"
        from="${measurePresentationForm.measures}"
        optionKey="id"
        optionValue="unit"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="count">Cantidad</label>
    <g:textField name="count" class="form-control" />
</div>
