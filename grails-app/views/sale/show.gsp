<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Venta</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <table class="table table-hover table-bordered">
            <col width="25%">
            <col width="75%">

            <tbody>
                <tr>
                    <td>Cliente</td>
                    <td>${sale.client}</td>
                </tr>
                <tr>
                    <td>Tipo</td>
                    <td>
                        <pharmacyApp:saleType sale="${sale}" />
                    </td>
                </tr>
                <tr>
                    <td>Efectivo recibido</td>
                    <td>${sale.cashReceived}</td>
                </tr>
                <tr>
                    <td>Vuelto</td>
                    <td>${sale.turned}</td>
                </tr>
                <tr>
                    <td>Saldo</td>
                    <td>${sale.totalBalance}</td>
                </tr>
            </tbody>
        </table>

        <table class="table table-hover table-bordered">
            <col width="25%">
            <col width="75%">

            <tbody>
                <tr>
                    <td>Atendido por</td>
                    <td>${sale.registeredBy}</td>
                </tr>
                <tr>
                    <td>Fecha de creación</td>
                    <td>
                        <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd hh:mm" />
                    </td>
                </tr>
                <tr>
                    <td>Actualización mas reciente</td>
                    <td>
                        <g:formatDate date="${sale.lastUpdated}" format="yyyy-MM-dd hh:mm" />
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table table-hover table-bordered">
            <col width="25%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="45%" />

            <caption>Detalle de venta</caption>

            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio venta</th>
                    <th>Cantidad</th>
                    <th>Total compra</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <g:each in="${sale.salesDetail}" var="saleDetail">
                    <tr>
                        <td>${saleDetail.product}</td>
                        <td>${saleDetail.salePrice}</td>
                        <td>${saleDetail.quantity}</td>
                        <td>${saleDetail.total}</td>
                        <td></td>
                    </tr>
                </g:each>
            </tbody>
        </table>
    </body>
</html>
