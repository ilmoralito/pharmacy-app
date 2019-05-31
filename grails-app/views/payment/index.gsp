<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="layout" content="main">
    <title>Creditos</title>
    <r:require modules="bootstrap-css, bootstrap-collapse, app"/>
</head>
<body>
    <g:if test="${sales}">
        <table class="table table-hover table-bordered">
            <col width="50%">
            <col width="10%">
            <col width="10%">
            <col width="10%">
            <col width="10%">
            <col width="10%">

            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Saldo</th>
                    <th>Saldo actual</th>
                    <th>Fecha</th>
                    <th>Abonos</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <g:each in="${sales}" var="sale">
                    <tr>
                        <td>${sale.client}</td>
                        <td>${sale.totalBalance}</td>
                        <td>${sale.totalBalance.minus(sale?.payments?.amountPaid?.sum() ?: 0)}</td>
                        <td>
                            <g:formatDate date="${sale.dateCreated}" format="yyyy-MM-dd" />
                        </td>
                        <td>${sale.payments.size()}</td>
                        <td class="text-center">
                            <g:link action="show" id="${sale.id}">Detalle</g:link>
                        </td>
                    </tr>
                </g:each>
            </tbody>
        </table>
    </g:if>
    <g:else>
        <p>Sin datos que mostrar</p>
    </g:else>
</body>
</html>
