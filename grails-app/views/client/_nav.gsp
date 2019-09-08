<ul class="nav nav-tabs" style="margin-bottom: 10px;">
    <li role="presentation" class="${actionName == 'show' ? 'active' : ''}">
        <g:link action="show" id="${params.id}">Datos personales</g:link>
    </li>
    <li role="presentation" class="${actionName == 'history' ? 'active' : ''}">
        <g:link action="history" id="${params.id}">Historial de compra</g:link>
    </li>
    <li role="presentation" class="${actionName in ['creditHistory', 'archivedCredits', 'saleDetail'] ? 'active' : ''}">
        <g:link action="creditHistory" id="${params.id}">Historial de crédito</g:link>
    </li>
    <li role="presentation" class="${actionName == 'register' ? 'active' : ''}">
        <g:link action="register" id="${params.id}">Datos de registro</g:link>
    </li>
</ul>
