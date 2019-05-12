<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Inventario</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, inventory" />
    </head>
    <body>
        <g:if test="${inventoryList}">
            <g:if test="${inventoryWithLowStock}">
                <g:render template="lowstock" model="[inventoryList: inventoryWithLowStock]" />
            </g:if>

            <input type="text" id="filter" class="form-control" placeholder="Filtrar...">

            <table id="inventory" class="table table-hover table-bordered">
                <col width="45%">
                <col width="20%">
                <col width="20%">
                <col width="10%">
                <col width="5%">

                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Existencias</th>
                        <th>Precio de venta</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <g:each in="${inventoryList}" var="inventory">
                        <tr class="${inventory.stock <= 20 ? 'warning' : ''}">
                            <td>${inventory.product.name}</td>
                            <td>${inventory.stock}</td>
                            <td>
                                <g:formatNumber number="${inventory.salePrice}" type="number" maxFractionDigits="2" />
                            </td>
                            <td class="text-center">
                                <g:link action="changeEnableStatus" id="${inventory.id}">
                                    ${inventory.enabled ? 'Habilitado' : 'No habilitado'}
                                </g:link>
                            </td>
                            <td class="text-center">
                                <g:link action="show" id="${inventory.id}">Ver</g:link>
                            </td>
                        </tr>
                    </g:each>
                </tbody>
            </table>
        </g:if>
        <g:else>
            <div class="alert alert-info">Sin datos que mostrar</div>
        </g:else>
    </body>
</html>
