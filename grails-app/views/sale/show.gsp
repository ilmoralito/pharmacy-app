<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="layout" content="main" />
        <title>Venta</title>
        <r:require modules="bootstrap-css, bootstrap-collapse, saleDetail" />
    </head>
    <body>
        <g:render template="modalCancellation" />

        <sec:ifAllGranted roles="ROLE_ADMIN">
            <g:if test="${!sale.canceled}">
                <div class="row">
                    <div class="col-md-12">
                        <button
                            class="btn btn-warning pull-right"
                            data-toggle="modal"
                            data-target="#myModal"
                        >
                            Anular venta
                        </button>
                    </div>
                </div>
            </g:if>
        </sec:ifAllGranted>

        <table class="table table-hover table-bordered">
            <col width="25%">
            <col width="75%">

            <caption>Venta</caption>

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
                <g:if test="${sale.instanceOf(ni.sb.CashSale)}">
                    <tr>
                        <td>Efectivo recibido</td>
                        <td>${sale.cashReceived}</td>
                    </tr>
                    <tr>
                        <td>Vuelto</td>
                        <td>${sale.turned}</td>
                    </tr>
                </g:if>
                <tr>
                    <td>IVA</td>
                    <td>15%</td>
                </tr>
                <tr>
                    <td>Saldo</td>
                    <td>${sale.totalBalance}</td>
                </tr>
            </tbody>
        </table>

        <g:if test="${sale.canceled}">
            <table class="table table-hover table-bordered">
                <col width="25%" />
                <col width="75%" />

                <caption>Detalle de anulación</caption>

                <tbody>
                    <tr>
                        <td>Anulado por</td>
                        <td>${sale.canceledBy}</td>
                    </tr>
                    <tr>
                        <td>Fecha de anulación</td>
                        <td>
                            <g:formatDate date="${sale.canceled}" format="yyyy-MM-dd hh:mm" />
                        </td>
                    </tr>
                    <tr>
                        <td>Motivo de anulación</td>
                        <td>${sale.reasonForCancellation}</td>
                    </tr>
                </tbody>
            </table>
        </g:if>

        <table class="table table-hover table-bordered">
            <col width="25%">
            <col width="75%">

            <caption>Detalle de registro</caption>

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

        <g:render template="salesDetail" model="[sales: sale]" />
    </body>
</html>
