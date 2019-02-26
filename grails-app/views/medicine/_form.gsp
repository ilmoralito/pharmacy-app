<p>Medicina</p>

<g:hiddenField name="providerId" value="${params.providerId}"/>

<div class="form-group">
    <label for="name">Nombre</label>
    <g:textField name="name" value="${medicine?.name}" class="form-control"/>
</div>

<div class="form-group">
    <label for="location">Ubicacion</label>
    <g:select name="location" from="${constants.locations}" value="${medicine?.location}" class="form-control"/>
</div>

<div class="form-group">
    <label for="code">Codigo</label>
    <g:textField name="code" value="${medicine?.code}" class="form-control"/>
</div>

<div class="form-group">
    <label for="genericName">Nombre generico</label>
    <g:textField name="genericName" value="${medicine?.genericName}" class="form-control"/>
</div>

<p>Presentaciones</p>
<g:each in="${constants.presentations.keySet()}" var="presentation">
    <details ${medicine?.presentations?.name?.contains(presentation) ? 'open' : ''}>
        <summary>${presentation}</summary>

        <div class="content">
            <g:each in="${constants.presentations[presentation]}" var="measure">
                <div class="checkbox">
                    <label>
                        <g:checkBox
                            name="${presentation}"
                            value="${measure}"
                            checked="${medicine?.presentations?.find { it.name == presentation }?.measures?.contains(measure)}"/>
                        ${measure}
                    </label>
                </div>
            </g:each>
        </div>
    </details>
</g:each>