<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Historial</title>
        <meta name="layout" content="main" />
        <r:require modules="bootstrap-css, bootstrap-collapse, app" />
    </head>
    <body>
        <g:render template="nav"/>

        <g:if test="${sales.numberOfPurchases > 0}">
            <table class="table table-hover table-bordered">
                <caption>Resumen</caption>

                <col width="25%">
                <col width="75%">

                <tbody>
                    <tr>
                        <td>Número de compras</td>
                        <td>${sales.numberOfPurchases}</td>
                    </tr>
                    <tr>
                        <td>Número de compras anuladas</td>
                        <td>${sales.numberOfPurchasesCanceled}</td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <b>Número de compras por tipo</b>
                        </td>
                    </tr>
                    <g:each in="${sales.numberOfPurchasesByType}" var="sale">
                        <tr>
                            <td>${sale.type}</td>
                            <td>${sale.count}</td>
                        </tr>
                    </g:each>
                    <tr>
                        <td colspan="2">
                            <b>Lista de productos comprados</b>
                        </td>
                    </tr>
                    <g:each in="${sales.listOfProductsPurchased}" var="sale">
                        <tr>
                            <td>${sale.product}</td>
                            <td>${sale.count}</td>
                        </tr>
                    </g:each>
                    <tr>
                        <td colspan="2">
                            <b>Lista de productos comprados agrupados por dia</b>
                        </td>
                    </tr>
                    <g:each in="${sales.listOfPurchasedProductsGroupedByDay}" var="sale">
                        <tr>
                            <td>${sale.day}</td>
                            <td>${sale.count}</td>
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
