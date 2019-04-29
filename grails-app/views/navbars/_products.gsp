<ul class="nav nav-tabs" style="margin-bottom: 10px;">
    <li class="${controllerName == 'merchandiseSupplier' ? 'active' : ''}">
        <a href="/pharmacyApp/providers/${params.id}/merchandises">Artículos</a>
    </li>
    <li class="${controllerName == 'providerMedicine' ? 'active' : ''}">
        <a href="/pharmacyApp/providers/${params.id}/medicines">Medicamentos</a>
    </li>
    <li class="${controllerName == 'providerBrandBranded' ? 'active' : ''}">
        <a href="/pharmacyApp/providers/${params.id}/branders">Artículos marca</a>
    </li>
</ul>
