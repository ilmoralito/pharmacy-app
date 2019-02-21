<div class="form-group">
    <label for="fullName">Nombre completo</label>
    <g:textField name="fullName" value="${client?.fullName}" class="form-control" autofocus="true"/>
</div>

<div class="form-group">
    <label for="address">Direccion</label>
    <g:textArea name="address" value="${client?.address}" class="form-control"/>
</div>

<div class="form-group">
    <label for="identificationCard">Cedula</label>
    <g:textField name="identificationCard" value="${client?.identificationCard}" class="form-control"/>
</div>

<div class="form-group">
    <label>Telefonos</label>
    <g:textField name="phones" class="form-control" value="${client?.phones}" placeholder="Ej. (C)8888 7777, (M)9898 8888, ..."/>
</div>

<g:if test="${actionName == 'show'}">
    <div class="form-group">
        <label for="status" class="sr-only">Estado</label>
        <g:select name="status" from="['Activo', 'Inactivo']" keys="[true, false]" value="${client?.status}" class="form-control"/>
    </div>
</g:if>