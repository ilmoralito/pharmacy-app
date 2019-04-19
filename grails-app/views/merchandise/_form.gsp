<div class="form-group">
    <label for="name">Nombre</label>
    <g:textField
        name="name"
        value="${merchandise?.name}"
        class="form-control"
        autofocus="true"
    />
</div>

<div class="form-group">
    <label for="location">Ubicación</label>
    <g:select
        name="location"
        from="${locations}"
        value="${merchandise?.location}"
        class="form-control"
        noSelection="['':'Selecciona ubicación']"
    />
</div>
