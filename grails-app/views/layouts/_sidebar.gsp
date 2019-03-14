<ul class="nav nav-pills nav-stacked">
    <li class="${controllerName in ['provider'] ? 'active' : ''}">
        <g:link controller="provider" action="list">Proveedores</g:link>
    </li>
    <li class="${controllerName == 'client' ? 'active' : ''}">
        <g:link controller="client" action="list">Clientes</g:link>
    </li>
    <li class="${controllerName == 'purchaseOrder' && actionName != 'stock' ? 'active' : ''}">
        <g:link controller="purchaseOrder" action="list">Pedidos</g:link>
    </li>
    <li class="${controllerName == 'sale' ? 'active' : ''}">
        <g:link controller="sale" action="list">Ventas</g:link>
    </li>
    <li class="${controllerName == 'daily' ? 'active' : ''}">
        <g:link controller="daily" action="list">Diario</g:link>
    </li>
    
    <div class="panel panel-default">
        <div class="panel-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="${controllerName == 'presentation' ? 'active' : ''}">
                    <g:link controller="presentation" action="list">Presentaciones</g:link>
                </li>
                <li class="${controllerName == 'measure' ? 'active' : ''}">
                    <g:link controller="measure" action="list">Medidas</g:link>
                </li>
                <li class="${controllerName == 'measurePresentation' ? 'active' : ''}">
                    <g:link controller="measurePresentation" action="list">Presentaciones y medidas</g:link>
                </li>
                <li class="${controllerName == 'brand' ? 'active' : ''}">
                    <g:link controller="brand" action="list">Marcas</g:link>
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
