<p>Medicina</p>

<g:hiddenField name="id" value="${params.id}"/>

<div class="form-group">
    <label for="name">Nombre</label>
    <g:textField name="name" class="form-control"/>
</div>

<div class="form-group">
    <label for="location">Ubicacion</label>
    <g:select name="location" from="${constants.locations}" class="form-control"/>
</div>

<div class="form-group">
    <label for="code">Codigo</label>
    <g:textField name="code" class="form-control"/>
</div>

<div class="form-group">
    <label for="genericName">Nombre generico</label>
    <g:textField name="genericName" class="form-control"/>
</div>

<p>Presentaciones</p>

<g:each in="${constants.presentations.keySet()}" var="presentation">
    <details>
        <summary>${presentation}</summary>

        <div class="content">
            <g:each in="${constants.presentations[presentation]}" var="measure">
                <div class="checkbox">
                    <label>
                        <g:checkBox name="${presentation}" value="${measure}" checked="false"/>
                        ${measure}
                    </label>
                </div>
            </g:each>
        </div>
    </details>
</g:each>