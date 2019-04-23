<ul class="nav nav-tabs" style="margin-bottom: 10px;">
    <li class="${controllerName == 'merchandiseSupplier' ? 'active' : ''}">
        <a href="/pharmacyApp/providers/${params.id}/merchandises">Artículos</a>
    </li>
    <li class="${controllerName == 'medicine' ? 'active' : ''}">
        <g:link
            controller="medicine"
            action="list"
            params="[providerId: params.providerId]"
            >Medicamentos</g:link>
    </li>
    <li class="${controllerName == 'providerBrandBranded' ? 'active' : ''}">
        <a href="/pharmacyApp/providers/${params.id}/branders">Artículos marca</a>
    </li>
</ul>
