<ul class="nav nav-tabs">
    <li role="presentation" class="${controllerName == 'merchandise' ? 'active' : ''}">
        <g:link controller="merchandise" action="list" id="${params.id}">Articulos</g:link>
    </li>
    <li role="presentation" class="${controllerName == 'medicine' ? 'active' : ''}">
        <g:link controller="medicine" action="list" id="${params.id}">Medicamentos</g:link>
    </li>
    <li role="presentation">
        <a href="#">Articulos marca</a>
    </li>
</ul>
