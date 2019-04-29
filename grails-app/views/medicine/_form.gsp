<div class="form-group">
    <label for="name">Nombre</label>
    <g:textField name="name" class="form-control" />
</div>

<div class="form-group">
    <label for="genericName">Nombre generico</label>
    <g:textField name="genericName" class="form-control" />
</div>

<div class="form-group">
    <label for="location">Ubicación</label>
    <g:select
        name="location"
        from="${grailsApplication.config.ni.sb.locations}"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="laboratory">Laboratorio</label>
    <g:select
        name="laboratory"
        from="${medicineForm.laboratories}"
        optionKey="id"
        optionValue="name"
        noSelection="['': 'No asignar']"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="presentation">Presentación</label>
    <g:select
        name="presentation"
        from="${medicineForm.presentations}"
        optionKey="id"
        optionValue="name"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="quantity">Cantidad</label>
    <g:field type="number" name="quantity" min="1" class="form-control" />
</div>

<div class="form-group">
    <label for="measure">Medida</label>
    <g:select
        name="measure"
        from="${medicineForm.measures}"
        optionKey="id"
        optionValue="abbreviation"
        class="form-control"
    />
</div>
