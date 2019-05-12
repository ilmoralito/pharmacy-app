<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Inventario</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <g:link action="index" class="btn btn-default">Regresar</g:link>

        <table class="table table-hover table-bordered">
            <col width="25%">
            <col width="75%">

            <tbody>
                <tr>
                    <td>Producto</td>
                    <td>${inventory.product.name}</td>
                </tr>
                <tr>
                    <td>Existencias</td>
                    <td>${inventory.stock}</td>
                </tr>
                <tr>
                    <td>Precio de venta</td>
                    <td>${inventory.salePrice}</td>
                </tr>
                <tr>
                    <td>Habilitado</td>
                    <td>${inventory.enabled ? 'Si' : 'No'}</td>
                </tr>
                <tr>
                    <td>Registrado por</td>
                    <td>${inventory.registeredBy.fullName}</td>
                </tr>
                <tr>
                    <td>Actualizado por</td>
                    <td>${inventory.updatedBy.fullName}</td>
                </tr>
                <tr>
                    <td>Fecha de creación</td>
                    <td>
                        <g:formatDate date="${inventory.dateCreated}" format="yyyy-MM-dd" />
                    </td>
                </tr>
                <tr>
                    <td>Fecha de actualización mas reciente</td>
                    <td>
                        <g:formatDate date="${inventory.lastUpdated}" format="yyyy-MM-dd" />
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
