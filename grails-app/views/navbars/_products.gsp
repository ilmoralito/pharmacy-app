<ul class="nav nav-tabs">
    <li role="presentation" class="${controllerName == 'merchandise' ? 'active' : ''}">
        <g:link controller="merchandise" action="list" params="[providerId: params.providerId]">Articulos</g:link>
    </li>
    <li role="presentation" class="${controllerName == 'medicine' ? 'active' : ''}">
        <g:link controller="medicine" action="list" params="[providerId: params.providerId]">Medicamentos</g:link>
    </li>
    <li role="presentation">
        <a href="#">Articulos marca</a>
    </li>
</ul>
