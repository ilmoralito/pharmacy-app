<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Orden</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, orderShow"/>
</head>
<body>
    <table class="table table-hover table-bordered">
        <caption>Orden</caption>

        <col width="25%">
        <col width="75%">

        <tbody>
            <tr>
                <td>Proveedor</td>
                <td>${order.provider}</td>
            </tr>
            <tr>
                <td>Número de factura</td>
                <td>${order.invoiceNumber}</td>
            </tr>
            <tr>
                <td>Fecha de creación</td>
                <td>
                    <g:formatDate date="${order.dateCreated}" format="yyyy-MM-dd hh:mm" />
                </td>
            </tr>
            <tr>
                <td>Actualización mas reciente</td>
                <td>
                    <g:formatDate date="${order.lastUpdated}" format="yyyy-MM-dd hh:mm" />
                </td>
            </tr>
            <tr>
                <td>Registrado por</td>
                <td>${order.registeredBy.fullName}</td>
            </tr>
            <tr>
                <td>Actualizado por</td>
                <td>${order.updatedBy.fullName}</td>
            </tr>
        </tbody>
    </table>

    <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
        <table class="table table-hover table-bordered">
            <caption>Datos de cancelacion</caption>

            <col width="25%">
            <col width="75%">

            <tbody>
                <tr>
                    <td>Saldo a pagar</td>
                    <td>
                        <g:formatNumber number="${order.balanceToPay}" type="number" maxFractionDigits="2" />
                    </td>
                </tr>
                <tr>
                    <td>Fecha de pago</td>
                    <td>
                        <g:formatDate date="${order.paymentDate}" format="yyyy-MM-dd" />
                    </td>
                </tr>
                <g:if test="${!order.canceled}">
                    <tr>
                        <td>Dias para pagar</td>
                        <td>
                            <pharmacyApp:daysToPay paymentDate="${order.paymentDate}" />
                        </td>
                    </tr>
                </g:if>
                <tr>
                    <td style="vertical-align: middle;">Fecha de cancelación</td>
                    <td>
                        <g:if test="${!order.canceled}">
                            <button id="cancel" data-order-id="${order.id}" class="btn btn-primary">Cancelar</button>
                        </g:if>
                        <g:else>
                            <g:formatDate date="${order.canceled}" format="yyyy-MM-dd hh:mm" />
                        </g:else>
                    </td>
                </tr>
                <g:if test="${order.canceled}">
                    <tr>
                        <td>Cancelado por</td>
                        <td>${order.canceledBy.fullName}</td>
                    </tr>
                </g:if>
            </tbody>
        </table>
    </pharmacyApp:isCreditPaymentPurchaseOrderInstance>

    <table class="table table-hover table-bordered">
        <caption>Artículos</caption>

        <col width="25%" />
        <col width="25%" />
        <col width="20%" />
        <col width="20%" />
        <col width="10%" />

        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio de compra</th>
                <th>Precio de venta</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <g:each in="${order.items}" var="item">
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <g:formatNumber number="${item.purchasePrice}" type="number" maxFractionDigits="2" />
                    </td>
                    <td>
                        <g:formatNumber number="${item.salePrice}" type="number" maxFractionDigits="2" />
                    </td>
                    <td>
                        <g:formatNumber number="${item.totalBalance}" type="number" maxFractionDigits="2" />
                    </td>
                </tr>
            </g:each>
            <tr>
                <td colspan="4">Total</td>
                <td>
                    <g:formatNumber number="${order.items.totalBalance.sum()}" type="number" maxFractionDigits="2" />
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
