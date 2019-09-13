<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Orden</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, order"/>
</head>
<body>
    <sec:ifAllGranted roles="ROLE_ADMIN">
        <g:if test="${!order.approvalDate}">
            <g:link action="approve" id="${order.id}" class="btn btn-warning approveButton">Aprobar orden</g:link>
        </g:if>
    </sec:ifAllGranted>

    <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
        <g:if test="${!order.canceled}">
            <g:link action="cancel" id="${order.id}" class="btn btn-primary cancelButton">Marcar orden como cancelada</g:link>
        </g:if>
    </pharmacyApp:isCreditPaymentPurchaseOrderInstance>

    <g:if test="${order.approvalDate}">
        <div class="alert alert-info">Orden aprobada</div>
    </g:if>

    <g:if test="${flash.message}">
        <div class="alert alert-info" style="margin-top: 10px;">${flash.message}</div>
    </g:if>

    <table id="order" class="table table-hover table-bordered">
        <caption>Orden</caption>

        <col width="25%">
        <col width="65%">
        <col width="10%">

        <tbody>
            <tr>
                <td>Proveedor</td>
                <td colspan="2">${order.provider}</td>
            </tr>
            <tr>
                <td style="vertical-align: middle;">Número de factura</td>
                <td>${order.invoiceNumber}</td>
                <td  style="vertical-align: middle;" class="text-center">
                    <g:if test="${!order.approvalDate}">
                        <a href="#" data-order-id="${order.id}" data-field="invoiceNumber">Editar</a>
                    </g:if>
                    <g:else>
                        <span style="text-decoration-line: line-through;">Editar</span>
                    </g:else>
                </td>
            </tr>
            <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
                <tr>
                    <td style="vertical-align: middle;">Fecha de pago</td>
                    <td>
                        <g:formatDate date="${order.paymentDate}" format="yyyy-MM-dd" />
                    </td>
                    <td style="vertical-align: middle;" class="text-center">
                        <g:if test="${!order.approvalDate}">
                            <a href="#" data-order-id="${order.id}" data-field="paymentDate">Editar</a>
                        </g:if>
                        <g:else>
                            <span style="text-decoration-line: line-through;">Editar</span>
                        </g:else>
                    </td>
                </tr>
            </pharmacyApp:isCreditPaymentPurchaseOrderInstance>
            <tr>
                <td>Tipo</td>
                <td colspan="2">
                    <pharmacyApp:paymentType order="${order}" />
                </td>
            </tr>
            <tr>
                <td>Fecha de creación</td>
                <td colspan="2">
                    <g:formatDate date="${order.dateCreated}" format="yyyy-MM-dd hh:mm" />
                </td>
            </tr>
            <tr>
                <td>Actualización mas reciente</td>
                <td colspan="2">
                    <g:formatDate date="${order.lastUpdated}" format="yyyy-MM-dd hh:mm" />
                </td>
            </tr>
            <tr>
                <td>Registrado por</td>
                <td colspan="2">${order.registeredBy.fullName}</td>
            </tr>
            <tr>
                <td>Actualizado por</td>
                <td colspan="2">${order.updatedBy.fullName}</td>
            </tr>
            <g:if test="${order.approvalDate}">
                <tr>
                    <td>Fecha de aprobación</td>
                    <td colspan="2">
                        <g:formatDate date="${order.approvalDate}" format="yyyy-MM-dd hh:mm" />
                    </td>
                </tr>
                <tr>
                    <td>Aprobado por</td>
                    <td colspan="2">${order.approvedBy.fullName}</td>
                </tr>
            </g:if>
        </tbody>
    </table>

    <pharmacyApp:isCreditPaymentPurchaseOrderInstance order="${order}">
        <table class="table table-hover table-bordered">
            <caption>Datos de cancelacion</caption>

            <col width="25%">
            <col width="75%">

            <tbody>
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
                        <g:formatDate date="${order.canceled}" format="yyyy-MM-dd hh:mm" />
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

    <g:if test="${!order.approvalDate && !object?.canceled}">
        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#addItemModal">Agregar artículo</a>
    </g:if>

    <g:if test="${order.items}">
        <table id="items" class="table table-hover table-bordered">
            <caption>Artículos</caption>

            <col width="25%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />

            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio de compra</th>
                    <th>Precio de venta</th>
                    <th>Total</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <g:each in="${order.items}" var="item">
                    <tr>
                        <td style="vertical-align: middle;">${item.product.name}</td>
                        <td>${item.quantity}</td>
                        <td>
                            <g:formatNumber number="${item.purchasePrice}" type="number" maxFractionDigits="2" groupingUsed="false" />
                        </td>
                        <td>
                            <g:formatNumber number="${item.salePrice}" type="number" maxFractionDigits="2" groupingUsed="false" />
                        </td>
                        <td style="vertical-align: middle;" class="balance">
                            <g:formatNumber number="${item.totalBalance}" type="number" maxFractionDigits="2" groupingUsed="false" />
                        </td>
                        <td style="vertical-align: middle;" class="text-center">
                            <g:if test="${!order.approvalDate}">
                                <a href="#" data-item-id="${item.id}" data-order-id="${order.id}">Editar</a>
                            </g:if>
                            <g:else>
                                <span style="text-decoration-line: line-through;">Editar</span>
                            </g:else>
                        </td>
                        <td style="vertical-align: middle;" class="text-center">
                            <g:if test="${!order.approvalDate}">
                                <a
                                    href="#"
                                    data-item-id="${item.id}"
                                    data-item-balance="${item.totalBalance}"
                                    data-order-id="${order.id}"
                                >
                                    Eliminar
                                </a>
                            </g:if>
                            <g:else>
                                <span style="text-decoration-line: line-through;">Eliminar</span>
                            </g:else>
                        </td>
                    </tr>
                </g:each>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">TOTAL</td>
                    <td id="totalBalance">
                        <g:formatNumber number="${order.items.totalBalance.sum()}" type="number" maxFractionDigits="2" groupingUsed="false" />
                    </td>
                    <td colspan="2"></td>
                </tr>
            </tfoot>
        </table>
    </g:if>
    <g:else>
        <div class="alert alert-info" style="margin-top: 10px;">Sin ordenes que mostrar</div>
    </g:else>
</body>
</html>
