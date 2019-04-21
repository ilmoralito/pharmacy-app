<div class="form-group">
    <label for="name">Nombre</label>
    <g:textField
        name="name"
        value="${branded?.name}"
        class="form-control"
    />
</div>

<div class="form-group">
    <label for="location">Ubicación</label>
    <g:select
        name="location"
        from="${grailsApplication.config.ni.sb.locations}"
        value="${branded?.location}"
        class="form-control"
        noSelection="['':'Selecciona ubicación']"
    />
</div>
