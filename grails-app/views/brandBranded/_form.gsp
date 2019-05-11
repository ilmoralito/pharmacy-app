<div class="form-group">
    <label for="brand">Marca</label>
    <g:select
        name="brand"
        from="${brandBranded.brands}"
        optionKey="id"
        optionValue="name"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="branded">Producto</label>
    <g:select
        name="branded"
        from="${brandBranded.brandProducts}"
        optionKey="id"
        optionValue="name"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="location">Ubicación</label>
    <g:select
        name="location"
        from="${grailsApplication.config.ni.sb.locations}"
        noSelection="['':'Selecciona ubicación']"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="description">Descripción</label>
    <g:textField name="description" class="form-control" />
</div>

