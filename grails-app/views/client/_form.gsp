<div class="form-group">
    <label for="firstName">Primer nombre</label>
    <g:textField
        name="firstName"
        value="${client?.firstName}"
        class="form-control"
        autofocus="true"
    />
</div>

<div class="form-group">
    <label for="lastName">Segundo apellido</label>
    <g:textField
        name="lastName"
        value="${client?.lastName}"
        class="form-control"
        autofocus="true"
    />
</div>

<div class="form-group">
    <label for="address">Dirección</label>
    <g:textArea
        name="address"
        value="${client?.address}"
        class="form-control"
        placeholder="Ej. Mina el limón, Arlen Siu, dirección..."
    />
</div>

<div class="form-group">
    <label for="identificationCard">Cedula</label>
    <g:field
        type="text"
        name="identificationCard"
        value="${client?.identificationCard}"
        class="form-control"
        placeholder="Ej. 291-170180-0001W"
        maxLength="16"
        minLength="16"
    />
</div>

<div class="form-group">
    <label>Telefonos</label>
    <g:textField
        name="phones"
        class="form-control"
        value="${client?.phones}"
        placeholder="Ej. (c)8888 7777, (m)9898 8888, ..."
    />
</div>

<g:if test="${actionName == 'show'}">
    <div class="form-group">
        <label for="status" class="sr-only">Estado</label>
        <g:select
            name="status"
            from="['Activo', 'Inactivo']"
            keys="[true, false]"
            value="${client?.status}"
            class="form-control"
        />
    </div>
</g:if>
