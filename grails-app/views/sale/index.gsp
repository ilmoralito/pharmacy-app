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

        <g:if test="${canceledSales}">
            <g:render template="sales" model="[sales: canceledSales, caption: 'Ventas anuladas']" />
        </g:if>

        <g:if test="${sales}">
            <g:render template="sales" model="[sales: sales, showTotal: true, caption: 'Ventas del dia']" />
        </g:if>
        <g:else>
            <p>Sin datos que mostra</p>
        </g:else>
    </body>
</html>
