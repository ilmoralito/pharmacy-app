<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Ventas</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <div class="row">
            <div class="col-md-12">
                <a href="/pharmacyApp/sales/create" class="btn btn-primary pull-right">Vender</a>
            </div>
        </div>

        <g:if test="${sales}">
            <table class="table table-hover table-bordered">
                <col width="25%">
                <col width="25%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="10%">

                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Atendido por</th>
                        <th>Tipo</th>
                        <th>Recibido</th>
                        <th>Vuelto</th>
                        <th>Saldo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <g:each in="${sales}" var="sale">
                        <tr>
                            <td>${sale.client}</td>
                            <td>${sale.registeredBy}</td>
                            <td>
                                <pharmacyApp:saleType sale="${sale}" />
                            </td>
                            <td>${sale.cashReceived}</td>
                            <td>${sale.turned}</td>
                            <td>${sale.totalBalance}</td>
                            <td class="text-center">
                                <g:link action="show" id="${sale.id}">Detalle</g:link>
                            </td>
                        </tr>
                    </g:each>
                    <tr>
                        <td colspan="5">TOTAL</td>
                        <td>${sales.totalBalance.sum()}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </g:if>
        <g:else>
            <p>Sin datos que mostra</p>
        </g:else>
    </body>
</html>
