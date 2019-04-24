<ul class="nav nav-pills nav-stacked">
    <li class="${controllerName == 'client' ? 'active' : ''}">
        <g:link controller="client" action="list">Clientes</g:link>
    </li>
    <li class="${controllerName == 'purchaseOrder' && actionName != 'stock' ? 'active' : ''}">
        <g:link controller="purchaseOrder" action="list">Pedidos</g:link>
    </li>
    <li class="${controllerName == 'sale' ? 'active' : ''}">
        <g:link controller="sale" action="list">Ventas</g:link>
    </li>
    <li class="${controllerName in ['provider', 'merchandiseSupplier', 'providerBrandBranded'] ? 'active' : ''}">
        <g:link controller="provider" action="list">Proveedores</g:link>
    </li>

    <div class="panel panel-default" style="margin: 10px 0;">
        <div class="panel-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="${controllerName == 'diarySpend' && actionName != 'resume' ? 'active' : ''}">
                    <g:link controller="diarySpend" action="list">Gasto diario</g:link>
                </li>
                <li class="${controllerName == 'diarySpend' && actionName == 'resume' ? 'active' : ''}">
                    <g:link controller="diarySpend" action="resume">Resumen gasto diario</g:link>
                </li>
            </ul>
        </div>
    </div>

    <div class="panel panel-default" style="margin: 10px 0;">
        <div class="panel-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="${controllerName == 'measure' ? 'active' : ''}">
                    <g:link controller="measure" action="list">Medidas</g:link>
                </li>
                <li class="${controllerName == 'presentation' ? 'active' : ''}">
                    <g:link controller="presentation" action="list">Presentaciones</g:link>
                </li>
                <li class="${controllerName == 'laboratory' ? 'active' : ''}">
                    <g:link controller="laboratory" action="list">Laboratorios</g:link>
                </li>
                <li class="${controllerName == 'measurePresentation' ? 'active' : ''}">
                    <g:link controller="measurePresentation" action="list">Medicinas</g:link>
                </li>
            </ul>
        </div>
    </div>

    <div class="panel panel-default" style="margin: 10px 0;">
        <div class="panel-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="${controllerName == 'brand' ? 'active' : ''}">
                    <g:link controller="brand" action="list">Marcas</g:link>
                </li>
                <li class="${controllerName == 'brandProduct' ? 'active' : ''}">
                    <g:link controller="brandProduct" action="list">Productos</g:link>
                </li>
                <li class="${controllerName == 'brandBranded' ? 'active' : ''}">
                    <g:link controller="brandBranded" action="list">Productos & Marcas</g:link>
                </li>
            </ul>
        </div>
    </div>

    <div class="panel panel-default" style="margin: 10px 0;">
        <div class="panel-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="${controllerName == 'merchandise' ? 'active' : ''}">
                    <g:link controller="merchandise" action="list">Productos</g:link>
                </li>
            </ul>
        </div>
    </div>

    <li class="${controllerName == 'purchaseOrder' && actionName == 'stock' ? 'active' : ''}">
        <g:link controller="purchaseOrder" action="stock">Inventario</g:link>
    </li>
    <li class="${controllerName == 'reports' ? 'active' : ''}">
        <g:link controller="reports" action="sales">Reportes</g:link>
    </li>
</ul>
