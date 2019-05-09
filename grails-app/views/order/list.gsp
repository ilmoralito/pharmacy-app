<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Ordenes</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, orders"/>
</head>
<body>
    <g:render template="/toddler/toddler" />

    <div class="row">
        <div class="col-md-12">
            <div class="pull-right">
                <a href="#" id="filter" class="btn btn-default">Filtrar</a>
                <a href="#" id="trigger" class="btn btn-primary">Crear orden</a>
            </div>
        </div>
    </div>

    <g:if test="${orders}">
        <table class="table table-hover table-bordered">
            <col width="38%">
            <col width="10%">
            <col width="10%">
            <col width="12%">
            <col width="10%">
            <col width="10%">
            <col width="10%">

            <thead>
                <tr>
                    <th>Proveedor</th>
                    <th>Tipo</th>
                    <th>Factura</th>
                    <th>Fecha de pago</th>
                    <th>Saldo</th>
                    <th>Cancelado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <g:each in="${orders}" var="order">
                    <tr>
                        <td>${order.provider.name}</td>
                        <td>
                            <pharmacyApp:paymentType order="${order}" />
                        </td>
                        <td>${order.invoiceNumber}</td>
                        <td>
                            <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
                                <g:formatDate date="${order.paymentDate}" format="yyyy-MM-dd" />
                            </pharmacyApp:isCreditPaymentPurchaseOrderInstance>
                        </td>
                        <td>
                            <g:formatNumber number="${order.balanceToPay}" type="currency" currencyCode="NIO" />
                        </td>
                        <td>
                            <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
                                <pharmacyApp:canceled canceled="${order.canceled}" />
                            </pharmacyApp:isCreditPaymentPurchaseOrderInstance>
                        </td>
                        <td class="text-center">
                            <a href="">Editar</a>
                        </td>
                    </tr>
                </g:each>
            </tbody>
        </table>
    </g:if>
    <g:else>
        <p>Nada que mostrar</p>
    </g:else>
</body>
</html>
