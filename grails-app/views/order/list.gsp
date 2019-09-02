<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Ordenes</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, orders"/>
</head>
<body>
    <div class="row">
        <div class="col-md-6">
            <input id="filter" class="form-control" placeholder="Filtrar por nombre, tipo o factura..." />
        </div>
        <div class="col-md-6">
            <button type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#providersModal">
                Crear orden
            </button>
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
                    <th>Saldo a pagar</th>
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
                            <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
                                <g:formatNumber number="${order.balanceToPay}" type="number" maxFractionDigits="2" />
                            </pharmacyApp:isCreditPaymentPurchaseOrderInstance>
                        </td>
                        <td>
                            <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
                                <g:formatDate date="${order.canceled}" format="yyyy-MM-dd" />
                            </pharmacyApp:isCreditPaymentPurchaseOrderInstance>
                        </td>
                        <td data-id="${order.id}" class="text-center">
                            <g:link action="show" id="${order.id}">Ver</g:link>
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
