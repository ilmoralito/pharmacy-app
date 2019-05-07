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
                <a href="#" id="trigger" class="btn btn-primary">Crear orden</a>
            </div>
        </div>
    </div>

    <g:if test="${orders}">
        <table class="table">
            <col width="5%">
            <col width="5%">
            <col width="5%">
            <col width="5%">
            <col width="5%">
            <col width="5%">

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
                        <td>${order.type}</td>
                        <td>${order.invoiceNumber}</td>
                        <td>${order.paymentDate}</td>
                        <td>${order.balanceToPay}</td>
                        <td>${order.canceled}</td>
                        <td>
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
