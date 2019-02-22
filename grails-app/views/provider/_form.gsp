<p>Datos proveedor</p>

<div class="form-group">
    <label for="name">Nombre</label>
    <g:textField name="name" value="${provider?.name}" class="form-control"/>
</div>

<div class="form-group">
    <label for="address">Direccion</label>
    <g:textArea name="address" value="${provider?.address}" class="form-control"/>
</div>

<div class="form-group">
    <label for="phone">Telefono</label>
    <g:textField name="phone" value="${provider?.phone}" class="form-control"/>
</div>

<p>Datos contacto</p>

<div class="form-group">
    <label for="firstName">Nombres</label>
    <g:textField name="firstName" value="${provider?.contact?.firstName}" class="form-control"/>
</div>

<div class="form-group">
    <label for="lastName">Apellidos</label>
    <g:textField name="lastName" value="${provider?.contact?.lastName}" class="form-control"/>
</div>

<div class="form-group">
    <label for="email">Correo</label>
    <g:textField name="email" value="${provider?.contact?.email}" class="form-control"/>
</div>

<div class="form-group">
    <label for="telephoneNumber">Telefono</label>
    <g:textField name="telephoneNumber" value="${provider?.contact?.telephoneNumber}" class="form-control"/>
</div>

<g:if test="${actionName == 'show'}">
    <div class="form-group">
        <label for="status">Estado</label>
        <g:select name="status" from="${['Activo', 'Inactivo']}" keys="[true, false]" value="${provider?.status}" class="form-control"/>
    </div>
</g:if>