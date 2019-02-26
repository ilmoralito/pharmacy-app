<input type="hidden" name="providerId" value="${params.providerId}">

<div class="form-group">
    <label for="name">Nombre del producto</label>
    <g:textField name="name" value="${product?.name}" class="form-control" placeholder="Nombre del producto" autofocus="true"/>
</div>

<div class="form-group">
    <label for="location">Ubicacion</label>
    <g:select name="location" from="${grailsApplication.config.ni.sb.locations}" value="${product?.location}" class="form-control" noSelection="['':'Selecciona ubicacion']"/>
</div>
